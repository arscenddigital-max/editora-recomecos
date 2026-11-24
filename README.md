# Editora Recomeços — Site institucional

Site estático (HTML + CSS + JavaScript puro), sem dependências e sem etapa de build.
Pronto para publicar na **Vercel** a partir do **GitHub**.

## Estrutura

```
editora-recomecos/
├── index.html              → página principal
├── 404.html                → página de erro
├── favicon.svg
├── vercel.json             → configuração da Vercel
├── robots.txt
└── assets/
    ├── css/style.css       → visual do site (cores da marca no topo do arquivo)
    ├── css/fonts.css       → fontes hospedadas no próprio site
    ├── js/books.js         → CATÁLOGO: títulos, preços, resumos
    ├── js/main.js          → animações e interações
    ├── fonts/              → Cormorant Garamond, Cinzel, Manrope (licença OFL)
    ├── img/                → capas dos livros, logo, imagem de compartilhamento
    └── marca/              → logo em alta resolução (PNG)
```

## Como adicionar um livro novo

1. Coloque a capa em `assets/img/` (de preferência `.webp`, 800 px de largura).
2. Abra `assets/js/books.js`, copie um bloco e altere `titulo`, `autor`, `preco`, `imagem` e `resumo`.
3. Em `index.html`, copie um `<article class="book">` da seção **Catálogo** e troque o `data-open-book` pelo novo id.

## Ver o site no computador

No VS Code, instale a extensão **Live Server**, clique com o botão direito em `index.html` → **Open with Live Server**.

## Publicar

```bash
git add .
git commit -m "Descrição da alteração"
git push
```

A Vercel publica automaticamente a cada `git push`.
