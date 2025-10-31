# 🚀 Guia Rápido de Início

## ⚡ Em 5 Minutos

### 1. Abra o Site
```bash
# Abra o index.html no seu navegador preferido
# Ou use um servidor local:
python -m http.server 8000
```

### 2. Personalize Informações Básicas
Edite `index.html` e procure por:

```html
<!-- LINHA 111: Seu Nome -->
<span class="shimmer">Seu Nome</span>

<!-- LINHA 612: Seu Email -->
<p>seu-email@dominio.com</p>
```

### 3. Pronto! 🎉
Seu portfólio está funcionando com:
- ✅ 3 projetos de exemplo
- ✅ Animações modernas
- ✅ Layout responsivo
- ✅ Imagens com fallback automático

---

## 📝 Personalização Completa (30 minutos)

### Passo 1: Informações Pessoais

#### A. Nome e Título
```html
<!-- index.html - Linha 111 -->
<span class="shimmer">João Silva</span>

<!-- index.html - Linha 114 -->
<span class="gradient-text">Desenvolvedor Full Stack</span>
```

#### B. Estatísticas
```html
<!-- index.html - Linhas 125-142 -->
<div class="stat-number" data-target="5000">0</div> <!-- Suas horas de código -->
<div class="stat-number" data-target="25">0</div>   <!-- Seus projetos -->
<div class="stat-number" data-target="15">0</div>   <!-- Suas certificações -->
```

#### C. Bio
```html
<!-- index.html - Linhas 205-214 -->
<p>
    Sou desenvolvedor com X anos de experiência...
    [Sua bio aqui]
</p>
```

#### D. Contato
```html
<!-- index.html - Linhas 612-648 -->
<p>joao.silva@email.com</p>
<p>São Paulo, SP</p>
```

### Passo 2: Redes Sociais

Substitua todos os `href="#"` por seus links reais:

```html
<!-- LinkedIn -->
<a href="https://linkedin.com/in/joaosilva">

<!-- GitHub -->
<a href="https://github.com/joaosilva">

<!-- Twitter/X -->
<a href="https://twitter.com/joaosilva">

<!-- Email -->
<a href="mailto:joao.silva@email.com">
```

### Passo 3: Imagens (Opcional)

#### Opção A: Use as Imagens Atuais (Mais Rápido)
- O site já funciona com as imagens da pasta `image/`
- Fallbacks automáticos estão configurados

#### Opção B: Adicione Suas Fotos
1. **Avatar** (200x200px): Salve como `image/3.png`
2. **Perfil** (400x400px): Salve como `image/4.png`

Dica: Use [remove.bg](https://remove.bg) para remover fundo

### Passo 4: Projetos

#### Editar Projetos Existentes

**Projeto 1 - IA** (Linha 451-495)
```html
<h3 class="project-title">Seu Projeto de IA</h3>
<p class="project-description">
    Descrição do seu projeto...
</p>
<span class="tech-tag">Python</span>
<span class="tech-tag">TensorFlow</span>
```

**Projeto 2 - C#** (Linha 497-542)
```html
<h3 class="project-title">Seu Sistema C#</h3>
<p class="project-description">
    Descrição do seu sistema...
</p>
```

**Projeto 3 - Automação** (Linha 544-588)
```html
<h3 class="project-title">Sua Automação</h3>
<p class="project-description">
    Descrição da sua automação...
</p>
```

### Passo 5: Skills

#### Atualizar Ícones de Tecnologia (Linha 254-342)

```html
<!-- Exemplo: Adicionar React -->
<div class="tech-icon-item" data-tech="React">
    <div class="tech-icon-wrapper">
        <i class="fab fa-react"></i>
    </div>
    <span class="tech-name">React</span>
    <div class="tech-hover-info">
        <p>3 anos de experiência</p>
        <div class="tech-projects">5 projetos relacionados</div>
    </div>
</div>
```

#### Atualizar Skill Bars (Linha 346-395)

```html
<!-- Exemplo: Mudar porcentagem -->
<div class="skill-bar-item">
    <div class="skill-info">
        <span class="skill-name">JavaScript</span>
        <span class="skill-percentage">90%</span> <!-- Sua porcentagem -->
    </div>
    <div class="skill-bar">
        <div class="skill-progress" data-progress="90"></div> <!-- Mesmo valor -->
    </div>
</div>
```

---

## 🎨 Personalizações Avançadas

### Mudar Cores

Edite `style.css` (Linhas 10-18):

```css
:root {
    --primary-color: #2A2F4F;   /* Sua cor primária */
    --secondary-color: #4B5D78; /* Sua cor secundária */
    --accent-color: #79DE79;     /* Sua cor de destaque */
}
```

**Exemplos de paletas:**

```css
/* Azul Profissional */
--primary-color: #1a237e;
--secondary-color: #3949ab;
--accent-color: #00bcd4;

/* Roxo Moderno */
--primary-color: #4a148c;
--secondary-color: #7b1fa2;
--accent-color: #e040fb;

/* Verde Tecnológico */
--primary-color: #1b5e20;
--secondary-color: #388e3c;
--accent-color: #00e676;
```

### Mudar Fontes

Edite `index.html` (Linha 11):

```html
<!-- Mudar para outra fonte do Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
```

Depois, edite `style.css`:

```css
body {
    font-family: 'Inter', sans-serif; /* Nova fonte */
}

.title, .project-title {
    font-family: 'Roboto', sans-serif; /* Nova fonte para títulos */
}
```

### Adicionar Google Analytics

Adicione antes do `</head>` no `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX'); <!-- Seu ID aqui -->
</script>
```

---

## 🚀 Deploy

### GitHub Pages (Grátis)

```bash
# 1. Criar repositório no GitHub
git init
git add .
git commit -m "Meu portfólio"

# 2. Conectar ao GitHub
git remote add origin https://github.com/seu-usuario/portfolio.git
git push -u origin main

# 3. No GitHub: Settings → Pages → Source: main → Save
```

**Seu site estará em:** `https://seu-usuario.github.io/portfolio/`

### Vercel (Grátis - Mais Rápido)

```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel

# 3. Seguir as instruções
```

### Netlify (Grátis - Mais Simples)

1. Acesse [netlify.com](https://netlify.com)
2. Arraste a pasta do projeto
3. Pronto!

---

## 📋 Checklist Antes do Deploy

- [ ] Nome atualizado
- [ ] Email atualizado
- [ ] Bio personalizada
- [ ] Links de redes sociais corretos
- [ ] Estatísticas ajustadas
- [ ] Pelo menos 3 projetos com descrições reais
- [ ] Skills atualizadas
- [ ] Cores personalizadas (opcional)
- [ ] Imagens adicionadas (opcional)
- [ ] Testado em Chrome, Firefox, Safari
- [ ] Testado no celular
- [ ] FontAwesome funcionando

---

## 🆘 Problemas Comuns

### ❌ Site não abre
**Solução**: Use um servidor local
```bash
python -m http.server 8000
# Abra: http://localhost:8000
```

### ❌ Ícones não aparecem
**Solução**: Substitua a linha 15 do `index.html`:
```html
<!-- Trocar -->
<script src="https://kit.fontawesome.com/SEU_KIT_CODE.js"></script>

<!-- Por -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
```

### ❌ Animações lentas
**Solução**: Desative para teste editando `script.js`:
```javascript
// Comente esta linha (adicione // no início):
// AOS.init({
```

### ❌ Imagens não aparecem
**Solução**: Os fallbacks já estão configurados, mas verifique:
```bash
# No terminal
ls image/
# Deve mostrar: bkg.png, 1.png, 2.png, 3.png, 4.png
```

---

## 💡 Dicas Finais

### ✅ DO (Faça)
- ✅ Use imagens otimizadas (< 500KB cada)
- ✅ Teste em dispositivos móveis
- ✅ Mantenha suas informações atualizadas
- ✅ Adicione projetos reais
- ✅ Use cores consistentes

### ❌ DON'T (Não Faça)
- ❌ Deixar placeholders "Lorem Ipsum"
- ❌ Usar imagens gigantes (> 2MB)
- ❌ Copiar projetos de outras pessoas
- ❌ Links quebrados (#)
- ❌ Informações de contato falsas

---

## 📚 Recursos Úteis

### Aprendizado
- [MDN Web Docs](https://developer.mozilla.org/) - Documentação completa
- [CSS-Tricks](https://css-tricks.com/) - Tutoriais de CSS
- [JavaScript.info](https://javascript.info/) - Guia completo de JS

### Imagens
- [Unsplash](https://unsplash.com/) - Fotos gratuitas
- [UI Avatars](https://ui-avatars.com/) - Avatars automáticos
- [Remove.bg](https://remove.bg/) - Remover fundos

### Ícones
- [Font Awesome](https://fontawesome.com/) - Ícones
- [Heroicons](https://heroicons.com/) - Ícones SVG
- [Iconify](https://iconify.design/) - Milhares de ícones

### Cores
- [Coolors](https://coolors.co/) - Paletas de cores
- [ColorHunt](https://colorhunt.co/) - Inspiração de cores
- [Adobe Color](https://color.adobe.com/) - Roda de cores

---

## 🎉 Pronto!

Seu portfólio está **100% funcional** e pronto para impressionar!

**Próximos passos:**
1. ✅ Personalize suas informações (5 min)
2. ✅ Teste no navegador
3. ✅ Faça o deploy no GitHub Pages
4. ✅ Compartilhe nas redes sociais!

**Precisa de ajuda?**
- 📖 Leia o `README.md` completo
- 🔧 Veja o `DEPLOYMENT-GUIDE.md` para deploy
- 📝 Confira o `CHANGELOG.md` para mudanças

---

**Boa sorte com seu portfólio! 🚀**

*Feito com ☕ e 💚*
