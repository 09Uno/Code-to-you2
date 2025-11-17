# Backend — IRIS GED (Resumo Técnico)

## Visão geral

Projeto: IRIS GED — API REST para Gestão Eletrônica de Documentos.
Objetivo: criação, leitura, versionamento, busca e controle de acesso de documentos com armazenamento em Object Storage (MinIO) e metadados em SQL Server.

## Arquitetura

- Padrão: Arquitetura em camadas (Controllers → Application/Services → Data/Repositories → Infra).
- Clean/Onion para manter dependências apontando para dentro e facilitar testes.

## Principais responsabilidades

- Controllers: orquestram requests, validação leve e autorização (policies).
- Services: regras de negócio, transações e coordenação entre repositórios e infra.
- Repositories: acesso a dados via Dapper/ADO.NET; queries otimizadas em arquivos separados.
- Infra: IFileService (MinIO), HashHelper, autenticação adapters, IdempotencyRepository.

## Fluxos principais

### CreateDocumentIntegration (M2M)
1. Controller recebe multipart/form-data + header `Idempotency-Key`.
2. Service valida e verifica idempotência; calcula hash SHA-256 do arquivo.
3. Repository insere metadados (INSERT ... OUTPUT) em transação.
4. IFileService faz upload para MinIO.
5. Commit transacional; retorno com detalhes do documento.

### SaveDocument (UI)
1. Usuário autenticado via Azure AD; permissões verificadas.
2. Service persiste metadados e faz upload de arquivo.
3. Response com DocumentDetailsDto.

### Download
- Service recupera metadados e conteúdo do Object Storage via IFileService; Controller retorna `File(content, mime, filename)`.

## Autenticação e autorização

- Azure AD (OIDC) para usuários.
- Client credentials para integrações M2M.
- Policies: `clients_allowed` para M2M; `[RequirePermission("SOME_PERMISSION")]` para usuários.
- Atributos customizados e handlers para compor políticas que aceitam M2M ou usuário com claims.

## Idempotência

- Header: `Idempotency-Key`.
- IdempotencyRepository registra chaves processadas e associa ao ResourceId criado.
- Comportamento: se chave já existe e ResourceId presente, retorna o recurso existente.

## Armazenamento de arquivos

- IFileService abstrai o provider (MinIO atual).
- Antes do upload, calcula-se SHA-256 e grava-se HashIntegridade nos metadados.
- Objetos nomeados com caminho padronizado: `documentos/{yyyy}/{MM}/{guid}_{sanitizedName}{ext}`.

## Exemplos de código (infra)

```csharp
public interface IAuthAzureService
{
    int GetCurrentUserId();
    string? GetCurrentUserEmail();
}

public class AuthAzureService : IAuthAzureService
{
    private readonly IHttpContextAccessor _http;
    public AuthAzureService(IHttpContextAccessor http) => _http = http;

    public int GetCurrentUserId()
    {
        var user = _http.HttpContext?.User;
        if (user == null || !user.Identity.IsAuthenticated) return 0;
        var idClaim = user.FindFirst("extension_UserId") ?? user.FindFirst(ClaimTypes.NameIdentifier);
        return idClaim != null && int.TryParse(idClaim.Value, out var id) ? id : 0;
    }

    public string? GetCurrentUserEmail() => _http.HttpContext?.User?.FindFirst(ClaimTypes.Email)?.Value;
}
```

```csharp
// Pseudocódigo do fluxo de criação (DocumentService)
public async Task<DocumentDetailsDto> CreateDocumentIntegrationAsync(CreateDocumentIntegrationDto dto)
{
    using var transaction = _connection.BeginTransaction();
    string objectPath = null!;
    try
    {
        using var stream = dto.File.OpenReadStream();
        var integrityHash = HashHelper.ComputeSha256Base64(stream);

        var ext = FileHelper.NormalizeExtension(Path.GetExtension(dto.File.FileName));
        var name = FileHelper.SanitizeFileName(Path.GetFileNameWithoutExtension(dto.File.FileName));
        objectPath = $"documentos/{DateTime.UtcNow:yyyy}/{DateTime.UtcNow:MM}/{Guid.NewGuid()}_{name}{ext}";

        var saved = await _documentRepository.CreateDocumentRecordAsync(dto, objectPath, integrityHash, transaction);

        stream.Position = 0;
        await _fileService.UploadAsync("documentos", objectPath, stream);

        transaction.Commit();
        return saved;
    }
    catch
    {
        transaction.Rollback();
        if (!string.IsNullOrEmpty(objectPath))
        {
            try { await _fileService.DeleteAsync("documentos", objectPath); } catch { }
        }
        throw;
    }
}
```

## Observações e recomendações

- Renomear `DocumentType` para evitar colisão com DOM (`DocumentTypeModel` ou `IDocumentType`).
- Padronizar contratos de paginação (0-index vs 1-index).
- Centralizar tratamento de erros e logging com um Interceptor/DelegatingHandler e filtros em Controllers.
- Fornecer scripts de DB e instruções para criar buckets e variáveis do Azure AD no README.

---

Se quiser, eu:
- atualizo `projeto-csharp-ged.html` com links concretos para o `docs/backend-iris-ged.md` e para o repositório/swagger,
- faço renomeação automática de `DocumentType` nas `types` (se quiser que eu procure e edite arquivos TS/C#),
- implemento ajustes finos na galeria (sincronizar thumbnails com Swiper) — diga qual próximo passo prefere.
