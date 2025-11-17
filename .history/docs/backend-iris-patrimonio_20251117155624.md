# Resumo do Backend — iris-patrimonio-api

## Visão geral
IRIS Patrimônio é uma API REST em .NET (C#) responsável por gerenciar ativos (patrimônio), transferências, usuários, departamentos e notificações (e‑mail). A arquitetura segue camadas bem definidas: Controllers (API), Services (lógica de negócio), Repositories (acesso a dados), DTOs (contratos), e infra (SMTP, GED, configuração). A aplicação usa injeção de dependência, Dapper/EF Core para persistência e um HostedService para lembretes automáticos.

## Responsabilidades principais
- CRUD de ativos, usuários e departamentos.
- Criar e acompanhar transferências de patrimônio.
- Notificações por e‑mail para destinatários, informantes e administradores.
- Lógica de confirmação/rejeição de transferências, com histórico por ativo.
- Rotina agendada (hosted service) para envio de lembretes de transferências pendentes.

## Padrões e boas práticas adotadas
- Separação de responsabilidades (Controller → Service → Repository).
- Interfaces para cada camada (ex.: `ITransferencyService`, `ITransferencyRepository`) para facilitar testes e mocking.
- Uso de DTOs entre API e camadas internas para evitar coupling com entidades EF.
- `async/await` por toda a stack onde há I/O.
- Tratamento de erros com logging e respostas HTTP claras (401/403/404/500 conforme o caso).
- Configuração e segredos mantidos fora do código (`IConfiguration`, variáveis de ambiente ou secret managers).
- Evitar vazamento de segredos em logs ou respostas.

## Autenticação e autorização
- Autenticação baseada em tokens (JWT) — o frontend deve enviar o header `Authorization: Bearer <token>`.
- Middleware de autenticação valida o token e popula `ClaimsPrincipal`.
- Autorização por roles/policies: rotas administrativas exigem role `Admin` ou policy específica.
- Boas práticas: validar escopos/roles nos controllers, usar Refresh Tokens se aplicável, e armazenar segredos do issuer/audience em vault ou variáveis de ambiente (não no código).

## Observações de segurança (sem exibir chaves)
- Não incluir connection strings, senhas ou chaves em código ou repositório.
- Use `appsettings.Development` para desenvolvimento local, e variáveis de ambiente/Key Vault em produção.
- Para SMTP, armazene credenciais no Secret Manager/Key Vault e carregue via `IConfiguration`.

---

## Texto oficial do projeto (versão para documentação)

IRIS Patrimônio é um sistema para gerenciamento de bens patrimoniais: cadastro, movimentação, transferências entre unidades e confirmação por parte do responsável pelo destino. O foco foi garantir rastreabilidade, facilidade de auditoria e integração com sistemas corporativos.

### O Problema
No caso do CREABA, o processo de controle de patrimônio era realizado com planilhas e procedimentos manuais, o que resultava em perdas, inconsistências e dificuldade para comprovar localização e estado dos bens.

### A Solução
Desenvolvemos um frontend em Angular para operações de cadastro, consulta e fluxo de transferência, e uma API RESTful em ASP.NET Core responsável por regras, persistência e integrações (armazenamento de arquivos em MinIO). O fluxo de transferência inclui geração de protocolo e confirmação via QR-code/link e por e‑mail para o destinatário.

---

## Exemplos de código (ilustrativos) — com explicações
> Obs.: os exemplos abaixo são sucintos e ilustrativos. Não incluem chaves/segredos.

### Controller — endpoint de confirmação de transferência
Por que: Controller deve ser fino; delega validação e regras ao Service e apenas retorna o status HTTP apropriado. A controller valida autorização (roles/policies) e transforma resultados em respostas HTTP.

```csharp
[ApiController]
[Route("api/[controller]")]
public class TransferencyController : ControllerBase
{
    private readonly ITransferencyService _transferService;
    public TransferencyController(ITransferencyService transferService)
    {
        _transferService = transferService;
    }

    // POST api/transferency/{id}/confirm
    [HttpPost("{id}/confirm")]
    [Authorize]
    public async Task<IActionResult> Confirm(long id)
    {
        var result = await _transferService.ConfirmTransferAsync(id);
        if (!result)
            return NotFound(new { success = false, message = "Transferência não encontrada ou já processada." });

        return Ok(new { success = true, message = "Transferência confirmada." });
    }
}
```

**O que este exemplo mostra**
- Estrutura de uma controller mínima: receber request, delegar para service, retornar status adequado.
- Uso de atributo `[Authorize]` para proteger o endpoint.

### Service — lógica de negócio para confirmação
Por que: Service contém as regras de negócio, coordena chamadas a repositories e infra (ex.: envio de notificações) e garante que a operação seja consistente (idempotência, logs, transações).

```csharp
public class TransferencyService : ITransferencyService
{
    private readonly ITransferencyRepository _transferRepo;
    private readonly IUnitOfWork _unitOfWork; // opcional, se houver
    private readonly ILogger<TransferencyService> _logger;

    public TransferencyService(ITransferencyRepository transferRepo, IUnitOfWork unitOfWork, ILogger<TransferencyService> logger)
    {
        _transferRepo = transferRepo;
        _unitOfWork = unitOfWork;
        _logger = logger;
    }

    public async Task<bool> ConfirmTransferAsync(long transferId)
    {
        var transfer = await _transferRepo.GetTransferByIdAsync(transferId);
        if (transfer == null || transfer.Confirmation) return false;

        transfer.Confirmation = true;
        transfer.ConfirmationDate = DateTime.UtcNow;

        await _transferRepo.UpdateTransferAsync(transfer);
        _logger.LogInformation("Transferência {TransferId} confirmada", transferId);
        return true;
    }
}
```

**O que este exemplo mostra**
- Validação do estado atual antes de aplicar mudanças.
- Atualização via repository e registro de logs.

### Repository — acesso a dados (Entity Framework / Dapper exemplo)
Por que: Repository encapsula detalhes de persistência (EF/Dapper/SQL) — a camada acima não deve conhecer a tecnologia usada. Exemplo também mostra como buscar entidades relacionadas e expor métodos reutilizáveis para queries otimizadas.

```csharp
public class TransferencyRepository : ITransferencyRepository
{
    private readonly ApplicationDbContext _context;
    public TransferencyRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<TransferencyEntity?> GetTransferByIdAsync(long transferId)
    {
        return await _context.Transferencies
                             .Include(t => t.Asset)
                             .Include(t => t.Destination)
                             .FirstOrDefaultAsync(t => t.Id == transferId);
    }

    public async Task UpdateTransferAsync(TransferencyEntity transfer)
    {
        _context.Transferencies.Update(transfer);
        await _context.SaveChangesAsync();
    }

    public async Task<IEnumerable<UnconfirmedTransferNotificationDto>> GetUnconfirmedTransfersForNotificationAsync()
    {
        var sql = @"-- query preparada (Dapper) que seleciona a ULTIMA transferência por patrimônio
                    -- e retorna somente se ela estiver pendente e não rejeitada";
        throw new NotImplementedException("Use Dapper/SQL otimizado ou LINQ com GroupBy/Max para buscar últimas transferências.");
    }
}
```

**O que este exemplo mostra**
- Como encapsular acesso a dados e usar `Include` para carregar relacionamentos quando necessário.
- Ponto de extensão para usar Dapper em queries de alto desempenho (query raw SQL para buscar últimas transferências por ativo).

---

## Boas práticas adicionais
- Validação dos inputs no Service (ou através de FluentValidation) e não confiar apenas no Controller.
- DTOs explícitos para requests/responses; AutoMapper para mapear entre entidades e DTOs.
- Concurrency: considerar colunas de versão (rowversion/timestamp) ao atualizar para evitar sobreposição de alterações.
- Testes: unit tests para Services e integration tests para Repositories (in-memory DB ou containerized DB).
- Logging estruturado e monitoramento (`ILogger` + Sentry/Elastic/etc).

## Erros comuns e como evitar
- Enviar lembretes baseados em transferências antigas: sempre selecione a última transferência por patrimônio antes de notificar (solução aplicada na repository query).
- Vazamento de credenciais: nunca commitar `appsettings` com senhas; use variáveis de ambiente e vaults.
- Regras duplicadas: centralizar regras de negócio em Services para evitar inconsistência entre endpoints.

## Deploy e configurações
- Variáveis de ambiente para connection strings, JWT secret, SMTP credentials.
- CI/CD: pipeline para build/test/publish. Em produção, usar um secret manager para JWT signing key e SMTP creds.
- Health checks e readiness endpoints para orquestradores (Kubernetes, Docker).

> Se quiser, adapto esse texto para um `backend.md` com exemplos reais do seu código (sem chaves) ou gero testes xUnit/Moq de exemplo.
