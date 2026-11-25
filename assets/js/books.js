/* =========================================================
   CATÁLOGO DA EDITORA RECOMEÇOS
   Cada livro tem um "id" (a chave). Campos:
   - kicker:   etiqueta pequena acima do título
   - titulo, autor, imagem
   - preco:    "29,90"  → mostra R$ 29,90
   - precoTexto: texto no lugar do preço (ex.: "Gratuito")
   - cta:      texto do botão do WhatsApp
   - mensagem: mensagem que já vai escrita no WhatsApp
   - resumo:   lista de parágrafos (aceita <strong>, <em>, listas)
   - categoria: espiritualidade | testemunhos | quadrinhos | historia
                (ou "lancamento" para aparecer em Próximos lançamentos)
   - selo:     etiqueta dourada na capa (opcional)
   A ORDEM aqui é a ordem em que os livros aparecem no site.
   ========================================================= */
window.LIVROS = {
  "o-chao": {
    categoria: "testemunhos",
    selo: "Destaque",
    kicker: "Testemunho",
    titulo: "O Chão Não É Moradia para os Filhos de Deus",
    autor: "Irmão Ricardo Lavra Lima",
    preco: "49,90",
    imagem: "assets/img/livro-o-chao-nao-e-moradia.webp",
    resumo: [
      "<strong>Quantas lágrimas uma mãe derrama enquanto espera seu filho voltar? Quantas famílias sofrem em silêncio? Quantas vidas são consideradas perdidas antes mesmo de receberem uma oportunidade de recomeçar?</strong>",
      "Em 21 capítulos marcados por histórias reais, testemunhos e profundas reflexões, Irmão Ricardo Lavra conduz o leitor por uma realidade que muitos preferem não enxergar: o sofrimento provocado pela dependência química e as feridas que ela deixa na vida de famílias inteiras.",
      "São histórias de mães que nunca desistiram, pais que não souberam demonstrar amor, esposas que enfrentaram noites de angústia, jovens que perderam seus caminhos e pessoas que precisaram encontrar coragem para se levantar…",
      "<em>Da queda à restauração: uma história real de dor, encontro e misericórdia.</em>"
    ]
  },
  "sao-jose-de-anchieta": {
    categoria: "historia",
    selo: "",
    kicker: "História e devoção",
    titulo: "São José de Anchieta em Magé",
    autor: "Pe. Leonardo Tassinari Resende",
    preco: "15,00",
    imagem: "assets/img/livro-sao-jose-de-anchieta-em-mage.webp",
    resumo: [
      "<strong>História, devoção e patrimônio.</strong>",
      "Entre a história, a fé e a tradição, o Padre Leonardo Tassinari Resende conduz o leitor a uma profunda investigação sobre a presença de São José de Anchieta em Magé, resgatando documentos históricos, antigos testemunhos e acontecimentos que marcaram a identidade religiosa da região.",
      "A obra apresenta a trajetória missionária do santo jesuíta, os relatos de curas atribuídas à sua intercessão, a história do Poço Bento e sua relação com a devoção a Nossa Senhora da Piedade, culminando na criação do Santuário Diocesano de São José de Anchieta.",
      "Com rigor histórico e sensibilidade pastoral, o autor distingue os fatos documentados das tradições populares, valorizando um patrimônio religioso preservado ao longo dos séculos.",
      "Mais do que um resgate histórico, este livreto é um convite a conhecer as raízes da nossa fé, preservar a memória religiosa e redescobrir a riqueza do legado evangelizador de São José de Anchieta em terras mageenses."
    ]
  },
  "drogas-sera": {
    categoria: "testemunhos",
    selo: "Nova capa",
    kicker: "Nova capa · Testemunho",
    titulo: "Drogas, Será que Preciso Disso?",
    autor: "Irmão Ricardo Lavra",
    precoTexto: "Consulte",
    cta: "Quero este livro",
    imagem: "assets/img/livro-drogas-sera-que-preciso-disso.webp",
    imagemOriginal: "assets/img/livro-drogas-sera-que-preciso-disso-capa-original.webp",
    resumo: [
      "<strong>A história verídica de um dependente químico no submundo das drogas, contada por ele mesmo.</strong>",
      "Primeira obra escrita pelo Irmão Ricardo Lavra, lançada em julho de 2000 com uma tiragem de 15 mil exemplares — hoje esgotada.",
      "Neste livreto, o autor narra seu próprio testemunho de vida, marcado por 13 anos de dependência química, sofrimento e perdas, mas transformado pela fé e pelo encontro com a misericórdia de Deus.",
      "Uma história verídica de luta, conversão e superação, que alerta sobre as falsas promessas das drogas e revela que é possível reconstruir a vida.",
      "Uma obra pioneira na trajetória literária e missionária do Irmão Ricardo, levando uma mensagem de prevenção, libertação e esperança aos jovens, às famílias e à sociedade.",
      "<em>Dizem que um livro se compra pela capa. Este, com certeza, também se compra pelo conteúdo.</em>"
    ]
  },
  "drogas-liberdade": {
    categoria: "quadrinhos",
    selo: "Gratuito",
    kicker: "Revista em quadrinhos · +16",
    titulo: "Drogas: Liberdade ou Ilusão?",
    autor: "Irmão Ricardo Lavra Lima",
    precoTexto: "Gratuito",
    precoNota: "pague somente o frete",
    cta: "Pedir meu exemplar",
    mensagem: "Olá! Gostaria de receber a revista \"Drogas: Liberdade ou Ilusão?\" (distribuição gratuita, pagando o frete). Como faço?",
    imagem: "assets/img/livro-drogas-liberdade-ou-ilusao.webp",
    resumo: [
      "<strong>A verdade é sua. A escolha também.</strong>",
      "Nesta revista em quadrinhos, Irmão Ricardo Lavra Lima apresenta seu testemunho de vida de maneira dinâmica, ilustrada e acessível, especialmente voltada ao público jovem.",
      "A obra retrata sua trajetória, os sonhos da juventude, as escolhas equivocadas, os 13 anos de dependência química e o caminho de conversão e superação.",
      "Com uma linguagem envolvente, a revista desmistifica a falsa liberdade oferecida pelas drogas, mostrando suas consequências e despertando a reflexão sobre a importância das escolhas.",
      "Uma importante ferramenta de prevenção à dependência química, destinada a escolas, famílias, grupos de jovens e projetos sociais, que transmite uma mensagem de conscientização, fé e esperança.",
      "<span class='modal__note'>Distribuição gratuita — cobrado somente o valor do frete. Indicado para maiores de 16 anos.</span>"
    ]
  },
  "oracoes-sobriedade": {
    categoria: "espiritualidade",
    selo: "Livreto",
    kicker: "Livreto de orações",
    titulo: "Orações pela Sobriedade",
    autor: "Irmão Ricardo Lavra & Marcelo Morais",
    precoTexto: "Consulte",
    cta: "Quero este livreto",
    imagem: "assets/img/livro-oracoes-pela-sobriedade.webp",
    resumo: [
      "<strong>Uma caminhada de fé e libertação. Você não está sozinho!</strong>",
      "Um livreto para rezar todos os dias no caminho de fé, cura e libertação. Reúne orações contra o alcoolismo, a cocaína, o crack, a dependência de medicamentos e outras drogas — para quem luta pela sobriedade e para a sua família.",
      "Cada página aponta uma direção: libertação, tratamento, família, esperança e vida nova. Porque, como ensina o Irmão Ricardo, “o chão não é moradia para os filhos de Deus”.",
      "<em>“Eu vim para que tenham vida e a tenham em abundância.” (João 10,10)</em>"
    ]
  },
  "gritos": {
    categoria: "testemunhos",
    selo: "",
    kicker: "Testemunhos",
    titulo: "Gritos pela Sobriedade",
    autor: "Irmão Ricardo Lavra",
    preco: "29,90",
    imagem: "assets/img/livro-gritos-pela-sobriedade.webp",
    resumo: [
      "<strong>Quando a dor vira clamor… e o clamor encontra resposta.</strong>",
      "“Gritos pela Sobriedade” não é apenas um livro. É o eco de almas cansadas, feridas e quase sem forças — mas que ainda ousaram gritar por ajuda.",
      "<span class='modal__subtitle'>Nesta obra, você vai encontrar:</span><ul class='modal__list'><li>Histórias reais de luta contra a dependência</li><li>Conflitos internos, quedas e recomeços</li><li>A dor de quem chegou ao fundo do poço</li><li>E a esperança que nasce quando tudo parece perdido</li></ul>",
      "<span class='modal__subtitle'>Este livro é para:</span><ul class='modal__list modal__list--check'><li>Quem luta contra vícios</li><li>Quem ama alguém nessa batalha</li><li>Quem trabalha com recuperação e acolhimento</li><li>Quem acredita que a sobriedade é possível</li></ul>"
    ]
  },
  "viver": {
    categoria: "quadrinhos",
    selo: "HQ",
    kicker: "História em quadrinhos",
    titulo: "Viver é Complexo — Saindo do Inferno",
    autor: "Ricardo Lavra Lima & Gilliard Viana · Ilustrações: Thamires R. da Silva",
    preco: "29,90",
    imagem: "assets/img/livro-viver-e-complexo.webp",
    resumo: [
      "<strong>A narrativa de um dependente.</strong>",
      "“Viver é Complexo – Saindo do Inferno” é uma história em quadrinhos que retrata, de forma intensa e humana, a trajetória de alguém que entra e sai do mundo das drogas.",
      "Entre quedas, perdas e conflitos internos, a narrativa mostra o vício como prisão e fuga ao mesmo tempo, revelando o inferno vivido por quem perde o controle da própria vida.",
      "Sem romantizar a dependência, a obra fala sobre dor, escolhas e a difícil, porém possível, reconstrução de si mesmo — lembrando que sair do inferno é um processo, e viver, de fato, é complexo."
    ]
  },
  "lapis": {
    categoria: "espiritualidade",
    selo: "3ª edição",
    kicker: "Espiritualidade · 3ª edição",
    titulo: "Um Lápis nas Mãos de Deus",
    autor: "Irmão Ricardo Lavra Lima & Diogo Andrade",
    preco: "29,90",
    imagem: "assets/img/livro-um-lapis-nas-maos-de-deus.webp",
    resumo: [
      "<strong>Você também é chamado a ser um lápis nas mãos de Deus.</strong>",
      "Um livro escrito por Irmão Ricardo e Diogo Andrade que reúne experiências com a Misericórdia Divina vividas por pessoas que foram esse “lápis” na vida de tantas outras.",
      "Vale a pena conferir: você irá se surpreender e descobrir que também pode deixar marcas de amor e esperança na história de alguém."
    ]
  },

  /* ---------- PRÓXIMOS LANÇAMENTOS ---------- */
  "reinflamar": {
    categoria: "lancamento",
    selo: "",
    kicker: "Próximo lançamento",
    titulo: "O Reinflamar da Misericórdia",
    autor: "Ricardo Filho & Anderson Rafael · Prefácio do Pe. Walnei de Moura Antunes",
    precoTexto: "Em breve",
    cta: "Quero ser avisado",
    mensagem: "Olá! Quero ser avisado(a) do lançamento do livro \"O Reinflamar da Misericórdia\".",
    imagem: "assets/img/livro-o-reinflamar-da-misericordia.webp",
    resumo: [
      "<strong>Reflexões sobre a Misericórdia Divina.</strong>",
      "Em um mundo marcado pela indiferença, pelo egoísmo e pela falta de amor ao próximo, reacender a chama da Misericórdia Divina torna-se uma necessidade urgente.",
      "Nesta obra, Ricardo Filho e Anderson Rafael apresentam, ao longo de 22 capítulos, profundas reflexões fundamentadas nas Sagradas Escrituras, nos ensinamentos da Igreja Católica e na espiritualidade de Santa Faustina Kowalska.",
      "Abordando temas como o perdão, a caridade, a compaixão, a cura interior, o amor incondicional e a missão cristã, os autores convidam o leitor a redescobrir a essência da misericórdia e a transformá-la em atitudes concretas.",
      "Com prefácio do Padre Walnei de Moura Antunes, <em>O Reinflamar da Misericórdia</em> é um convite à conversão, à renovação espiritual e ao reencontro com o primeiro amor.",
      "Mais do que compreender a Misericórdia Divina, esta obra nos desafia a vivê-la, permitindo que o fogo do amor de Deus volte a arder em nossos corações e, por meio de nós, alcance aqueles que mais necessitam."
    ]
  },
  "igreja-linda": {
    categoria: "lancamento",
    selo: "",
    kicker: "Próximo lançamento",
    titulo: "A Nossa Igreja é Linda",
    autor: "Padre Walnei de Moura Antunes",
    precoTexto: "Em breve",
    cta: "Quero ser avisado",
    mensagem: "Olá! Quero ser avisado(a) do lançamento do livro \"A Nossa Igreja é Linda\", do Padre Walnei de Moura Antunes.",
    imagem: "assets/img/livro-a-nossa-igreja-e-linda.webp",
    resumo: [
      "<strong>A caminhada de fé, a vocação e a missão sacerdotal do Padre Walnei de Moura Antunes.</strong>",
      "<span class='modal__note'>O resumo completo será divulgado em breve. Deixe seu contato pelo WhatsApp e avisaremos você no lançamento.</span>"
    ]
  }
};

window.WHATS_NUMERO = "5521981814835";
