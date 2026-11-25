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
2. Abra `assets/js/books.js`, copie um bloco e altere `titulo`, `autor`, `preco` (ou `precoTexto`), `imagem`, `categoria` e `resumo`.
3. Pronto: o livro aparece sozinho no catálogo. Com `categoria: "lancamento"` ele vai para **Próximos lançamentos**.

A ordem dos livros no site é a ordem em que aparecem no `books.js`.

## Ver o site no computador

No VS Code, instale a extensão **Live Server**, clique com o botão direito em `index.html` → **Open with Live Server**.

## Publicar

```bash
git add .
git commit -m "Descrição da alteração"
git push
```

A Vercel publica automaticamente a cada `git push`.
