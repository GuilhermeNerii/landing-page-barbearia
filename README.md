# Navalha de Ouro Barbearia — Landing Page

Landing page de uma barbearia da Tijuca (RJ). Objetivo único: **fazer o visitante agendar
um horário pelo WhatsApp**.

- **Stack:** HTML, CSS e JavaScript puro (sem frameworks, sem build)
- **Layout:** mobile-first e responsivo
- **Identidade:** preto, dourado e branco — estilo moderno/vintage
- **Slogan:** "Corte de respeito, acabamento de ouro."

## Estrutura

```
/index.html        → página única com as 8 seções
/css/style.css     → todo o estilo (mobile-first, comentado em PT-BR)
/js/main.js        → menu, animações, galeria, formulário, status "aberto agora"
/assets/           → imagens (placeholders SVG para trocar depois)
```

## Como abrir

Basta dar duplo clique no `index.html` (não precisa de servidor).
Para testar como no ar: `npx serve .` ou qualquer servidor estático.

## 👥 Desenvolvedores

**Cline (IA agente)** — design, arquitetura, CSS/layout, estilização mobile-first e SEO.

**Lucas-Heitz (Seu amigo)** — desenvolvimento do JavaScript (`main.js`), implementação da lógica WhatsApp, validação de formulário e integração com APIs externas.

Repositórios individuais:
- Lucas-Heitz: [github.com/Lucas-Heitz](https://github.com/Lucas-Heitz)
- Cline (project repo): [github.com/GuilhermeNerii/landing-page-barbearia](https://github.com/GuilhermeNerii/landing-page-barbearia)

## O que trocar antes de publicar

1. **WhatsApp** — procure e substitua `5521999999999` em **todo** o `index.html`
   e na constante `NUMERO_WHATSAPP` no topo do `js/main.js`.
   Formato: `55` + DDD `21` + número = `5521999999999`.
2. **Endereço e mapa** — endereço real no texto, nos links "Como chegar" e no
   JSON-LD (cabeçalho do `index.html`); no iframe do mapa, troque `q=Tijuca...`
   pelo endereço ou pelo `place_id` da barbearia.
6. **CNPJ e Razão Social** — atualizar no rodapé do `index.html` e na página `privacidade.html`.
7. **Política de Privacidade (LGPD & Tráfego Pago)** — a página `privacidade.html` já está pronta
   e estilizada, compatível com as regras de anúncio do Google Ads e Meta Ads.
8. **URL canônica e sociais** — `canonical`, `og:url` e as URLs das imagens sociais
   (hoje usam `https://www.navalhadeouro.com.br/` como exemplo).
   (hoje usam `https://www.navalhadeouro.com.br/` como exemplo).
4. **Imagens** — substitua os SVGs de `/assets` mantendo os nomes:
   - `corte-1.svg` … `corte-6.svg` (galeria, 800×600)
   - `barbeiro-1.svg` … `barbeiro-3.svg` (equipe, 400×400)
   - `hero-bg.svg` (fundo do topo), `logo.svg` (favicon/brasão)
   - `og-image.svg` → **exporte para `og-image.png` (1200×630)**, porque redes
     sociais não aceitam SVG no Open Graph.
5. **Preços, textos e depoimentos** — direto no HTML (cada bloco está comentado).
6. **CNPJ e ano** — rodapé (o ano é atualizado sozinho pelo JS).

## Acessibilidade implementada

- Link "pular para o conteúdo", foco visível e navegação por teclado
- `aria-expanded`/`aria-controls` no menu, `aria-live` no status do formulário
- Textos alternativos nas imagens, `alt` vazio em imagens decorativas
- Respeito a `prefers-reduced-motion` e a `forced-colors`
- Contraste alto (dourado/branco sobre preto)

## SEO incluído

`title`, `meta description`, canonical, Open Graph, Twitter Card e dados
estruturados `BarberShop` (JSON-LD) com horário de funcionamento e endereço.
