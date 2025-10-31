# 🚀 Portfólio Técnico Moderno

Portfólio profissional completamente redesenhado com animações de última geração, inspirado na App Store e nas melhores práticas de UI/UX modernas.

## ✨ Características Principais

### 🎨 Design Moderno
- **Loading Screen animado** com efeitos de glitch
- **Cursor customizado** com trail effect
- **Scroll Progress Bar** no topo da página
- **Glassmorphism** e efeitos de blur
- **Gradientes animados** e blobs flutuantes
- **Animações 3D** em cards e elementos interativos

### 🎭 Animações e Interatividade
- **Particles.js** - Fundo animado com partículas interativas
- **AOS (Animate On Scroll)** - Elementos aparecem ao rolar a página
- **GSAP + ScrollTrigger** - Animações avançadas baseadas em scroll
- **Typed.js** - Efeito de digitação dinâmico
- **Counters animados** - Estatísticas que incrementam ao aparecer
- **Ripple effect** - Microinteração em botões
- **Tilt effect** - Efeito 3D nos cards de projetos
- **Shimmer effect** - Brilho animado em textos

### 📱 Seções Implementadas

#### 1. Hero Section
- Avatar com border gradiente animado
- Typing effect elaborado
- Contadores de estatísticas animados
- Tech badges interativos
- CTAs com ripple effect
- Scroll indicator animado

#### 2. Sobre Mim
- Profile card com hover effects
- Links sociais animados
- Lista de expertises
- Botão de download CV

#### 3. Skills & Tecnologias
- Grid de ícones de tecnologias com hover info
- Skill bars animados com porcentagem
- Timeline de aprendizado interativa
- Efeitos de shimmer nas barras de progresso

#### 4. Projetos em Destaque
- Cards com elevação 3D
- Overlay animado ao hover
- Rating visual (5 estrelas)
- Tags de tecnologias
- Badges de "Novo" e "Destaque"
- Links para demo e GitHub

#### 5. Contato
- Cards de contato interativos
- Ícones com gradiente animado
- Hover effects elegantes

### 📄 Página Individual do Projeto (Estilo App Store)

#### Hero do Projeto
- Banner fullwidth com overlay
- Logo/ícone grande do projeto
- Rating e visualizações
- Botões de Demo e GitHub

#### Galeria de Mídia (Carrossel)
- **Swiper.js** para navegação suave
- Suporte a vídeos e imagens
- Thumbnails navegáveis
- Lightbox integrado (Lightbox2)
- Indicadores de tipo de mídia

#### Informações Detalhadas
- Seção "Sobre o Projeto"
- Stack técnica completa
- Lista de features com ícones
- Sidebar com estatísticas
- Tags de tecnologias
- Status do projeto

#### Resultados e Impacto
- Cards com métricas visuais
- Ícones animados
- Valores com contadores

#### Code Snippet
- Bloco de código estilizado
- Botão de copiar código
- Syntax highlighting ready

#### Navegação para Próximo Projeto
- Card grande com preview
- Transição suave

## 🎯 Easter Egg

Experimente o **Konami Code**: ↑ ↑ ↓ ↓ ← → ← → B A

## 🛠️ Tecnologias Utilizadas

### Frontend Core
- HTML5 Semântico
- CSS3 com Custom Properties
- JavaScript ES6+
- jQuery 3.6.0

### Bibliotecas de Animação
- **GSAP 3.12.2** - Animações avançadas
- **ScrollTrigger** - Scroll-based animations
- **AOS 2.3.1** - Animate On Scroll
- **Particles.js 2.0.0** - Partículas interativas
- **Typed.js 2.0.12** - Efeito de digitação

### Carrosséis e Lightbox
- **Swiper 11** - Carrossel moderno
- **Lightbox2 2.11.4** - Galeria de imagens

### Ícones e Fontes
- **Font Awesome** - Biblioteca de ícones
- **Google Fonts** - Poppins & Montserrat

## 📁 Estrutura de Arquivos

```
Code-to-you2/
├── index.html              # Página principal
├── style.css               # CSS principal (1585 linhas)
├── script.js               # JavaScript principal
├── README.md               # Este arquivo
├── image/                  # Imagens e assets
│   ├── avatar-placeholder.jpg
│   ├── profile-photo.jpg
│   ├── thumb-ia-nlp.jpg
│   ├── thumb-csharp-api.jpg
│   └── thumb-automacao.jpg
└── projetos/               # Páginas de projetos
    ├── project-template.html
    ├── project-page.css
    ├── project-page.js
    ├── projeto-ia.html
    ├── projeto-csharp.html
    └── projeto-automacao.html
```

## 🚀 Como Usar

### 1. Personalização Básica

#### Editar informações pessoais no `index.html`:

```html
<!-- Linha 111: Nome -->
<span class="shimmer">Seu Nome</span>

<!-- Linhas 125-142: Estatísticas -->
<div class="stat-number" data-target="5000">0</div>

<!-- Linhas 612-648: Contato -->
<p>seu-email@dominio.com</p>
```

#### Editar cores no `style.css`:

```css
:root {
    --primary-color: #2A2F4F;   /* Azul escuro */
    --accent-color: #79DE79;     /* Verde */
    /* Personalize aqui */
}
```

### 2. Adicionar Imagens

Substitua os placeholders na pasta `image/`:
- `avatar-placeholder.jpg` - Seu avatar (180x180px recomendado)
- `profile-photo.jpg` - Foto profissional (800x600px+)
- `thumb-*.jpg` - Thumbnails dos projetos (600x400px+)

### 3. Criar Nova Página de Projeto

1. Copie `projetos/project-template.html`
2. Renomeie para `projetos/seu-projeto.html`
3. Edite o conteúdo:
   - Título e descrição
   - Imagens e vídeos
   - Stack técnica
   - Resultados

4. Adicione o card na home (`index.html` linha 451+)

### 4. FontAwesome Setup

Substitua `SEU_KIT_CODE` pelo seu código do FontAwesome:

```html
<script src="https://kit.fontawesome.com/SEU_KIT_CODE.js"></script>
```

Ou use o CDN gratuito:

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

## ⚡ Otimizações de Performance

### Implementadas
- ✅ Lazy loading de imagens
- ✅ Intersection Observer para animações
- ✅ CSS com variables para melhor cache
- ✅ Preload de imagens críticas
- ✅ Debounce em scroll events
- ✅ Animações com GPU acceleration

### Recomendadas
- [ ] Minificar CSS e JS para produção
- [ ] Comprimir imagens (WebP format)
- [ ] Implementar Service Worker (PWA)
- [ ] Adicionar Cache-Control headers
- [ ] Usar CDN para assets estáticos

## 🎨 Paleta de Cores

| Cor | Hex | Uso |
|-----|-----|-----|
| Primary Dark | `#2A2F4F` | Backgrounds, textos principais |
| Secondary | `#4B5D78` | Elementos secundários |
| Accent Green | `#79DE79` | CTAs, destaques, links |
| Light BG | `#F2F4F8` | Backgrounds claros |
| Dark BG | `#1A1E31` | Cards escuros, footer |

## 📱 Responsividade

Breakpoints implementados:
- **Desktop**: 1200px+
- **Laptop**: 991px - 1199px
- **Tablet**: 768px - 990px
- **Mobile**: < 767px

Testado em:
- ✅ Chrome/Edge (Desktop & Mobile)
- ✅ Firefox (Desktop & Mobile)
- ✅ Safari (Desktop & iOS)
- ✅ Samsung Internet

## ♿ Acessibilidade

- ✅ Estrutura semântica HTML5
- ✅ Alt text em todas as imagens
- ✅ Navegação por teclado
- ✅ Focus visível em elementos interativos
- ✅ Contraste WCAG AA compliant
- ✅ ARIA labels quando necessário

## 🐛 Solução de Problemas

### Animações não funcionam
- Verifique se as bibliotecas estão carregando (console do navegador)
- Confirme que o jQuery está carregando antes do `script.js`

### Imagens não aparecem
- Verifique os caminhos relativos das imagens
- Certifique-se que as imagens existem na pasta `image/`

### Cursor customizado não aparece
- Funciona apenas em desktop
- Pode não funcionar em alguns navegadores mobile

### Particles não aparecem
- Verifique se o particles.js está carregando
- Veja o console para erros

## 📊 Checklist de Deploy

- [ ] Substituir todas as referências "SEU_KIT_CODE"
- [ ] Adicionar suas informações pessoais
- [ ] Trocar todas as imagens placeholder
- [ ] Testar em múltiplos navegadores
- [ ] Testar responsividade mobile
- [ ] Validar HTML (W3C Validator)
- [ ] Testar performance (Lighthouse)
- [ ] Comprimir imagens
- [ ] Minificar CSS e JS
- [ ] Configurar meta tags (SEO)
- [ ] Adicionar favicon
- [ ] Testar todos os links

## 🌟 Funcionalidades Extras (Opcionais)

### Dark Mode Toggle
Descomente no `script.js` (linhas 481-497) para ativar o tema escuro.

### Service Worker (PWA)
Descomente no `script.js` (linhas 610-617) e crie um arquivo `sw.js`.

### Google Analytics
Adicione antes do `</head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 📝 Créditos e Inspirações

- Design inspirado na **Apple App Store**
- Animações baseadas em **Awwwards** winners
- UI/UX seguindo padrões do **Material Design 3**
- Color palette: **Coolors.co**

## 📄 Licença

Este projeto é de código aberto. Sinta-se livre para usar, modificar e distribuir conforme necessário.

## 🤝 Contribuições

Sugestões e melhorias são bem-vindas!

---

**Desenvolvido com ☕ e 💚 por [Seu Nome]**

🔗 [LinkedIn](#) | [GitHub](#) | [Email](#)
