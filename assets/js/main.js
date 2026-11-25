/* =========================================================
   EDITORA RECOMEÇOS — Interações e animações
   JavaScript puro, sem dependências.
   ========================================================= */
(() => {
  "use strict";

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const body = document.body;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  /* ---------- Ano no rodapé ---------- */
  $$("[data-year]").forEach(el => (el.textContent = new Date().getFullYear()));

  /* ---------- Catálogo e lançamentos (montados a partir de books.js) ---------- */
  const esc = t => String(t ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const priceHTML = b => b.preco
    ? `<span class="price price--sm"><small>R$</small>${esc(b.preco)}</span>`
    : `<span class="price-tag">${esc(b.precoTexto || "Consulte")}${b.precoNota ? `<small>${esc(b.precoNota)}</small>` : ""}</span>`;
  const livros = Object.entries(window.LIVROS || {});
  const grid = $("#books-grid");
  if (grid) {
    grid.innerHTML = livros.filter(([, b]) => b.categoria !== "lancamento").map(([id, b], i) => `
      <article class="book reveal" data-delay="${(i % 4) * 2}" data-cat="${esc(b.categoria)}">
        <button class="book__btn" data-open-book="${esc(id)}" aria-label="Ver detalhes de ${esc(b.titulo)}">
          <div class="book__cover" data-tilt>
            <img src="${esc(b.imagem)}" alt="Capa de ${esc(b.titulo)}" loading="lazy" />
            <span class="book__shine"></span>
          </div>
          ${b.selo ? `<span class="book__badge">${esc(b.selo)}</span>` : ""}
        </button>
        <div class="book__info">
          <p class="book__kicker">${esc(b.kicker)}</p>
          <h3>${esc(b.titulo)}</h3>
          <p class="book__author">${esc(b.autor)}</p>
          <div class="book__row">${priceHTML(b)}<button class="link-arrow" data-open-book="${esc(id)}">Resumo <i>→</i></button></div>
        </div>
      </article>`).join("");
  }
  const lgrid = $("#launches-grid");
  if (lgrid) {
    lgrid.innerHTML = livros.filter(([, b]) => b.categoria === "lancamento").map(([id, b], i) => `
      <article class="launch reveal" data-delay="${i * 2}">
        <button class="launch__cover" data-open-book="${esc(id)}" aria-label="Ver detalhes de ${esc(b.titulo)}">
          <span class="launch__halo" aria-hidden="true"></span>
          <div class="book3d" data-tilt>
            <img src="${esc(b.imagem)}" alt="Capa de ${esc(b.titulo)}" loading="lazy" />
            <span class="book3d__spine"></span><span class="book3d__shine"></span>
          </div>
          <span class="launch__badge">Em breve</span>
        </button>
        <div class="launch__info">
          <h3>${esc(b.titulo)}</h3>
          <p class="launch__author">${esc(b.autor)}</p>
          <div class="launch__actions">
            <button class="btn btn--ghost btn--sm" data-open-book="${esc(id)}"><span>Saiba mais</span></button>
            <a class="btn btn--gold btn--sm" href="https://wa.me/${window.WHATS_NUMERO}?text=${encodeURIComponent(b.mensagem || "Olá! Quero ser avisado(a) do lançamento de \"" + b.titulo + "\".")}" target="_blank" rel="noopener"><span>Quero ser avisado</span></a>
          </div>
        </div>
      </article>`).join("");
  }

  /* ---------- Filtros do catálogo ---------- */
  $$(".filter").forEach(btn => btn.addEventListener("click", () => {
    const f = btn.dataset.filter;
    $$(".filter").forEach(b => { b.classList.toggle("is-active", b === btn); b.setAttribute("aria-selected", b === btn); });
    $$("#books-grid .book").forEach((card, i) => {
      const show = f === "todos" || card.dataset.cat === f;
      card.classList.toggle("is-hidden", !show);
      if (show) { card.classList.remove("is-pop"); void card.offsetWidth; card.style.setProperty("--pd", i % 4); card.classList.add("is-pop", "is-in"); }
    });
  }));

  /* ---------- Antes e depois da capa ---------- */
  $$("[data-compare]").forEach(box => {
    const range = $(".compare__range", box);
    const set = v => box.style.setProperty("--pos", v + "%");
    range.addEventListener("input", () => set(range.value));
    set(range.value);
  });

  /* ---------- Divide textos ---------- */
  // Letras (preloader)
  $$("[data-split]").forEach(el => {
    const t = el.textContent.trim();
    el.innerHTML = [...t].map((c, i) => `<span class="ch" style="animation-delay:${0.35 + i * 0.05}s">${c}</span>`).join("");
  });
  // Palavras (títulos) — preserva <em>
  $$("[data-split-words]").forEach(el => {
    let i = 0;
    const wrap = node => {
      if (node.nodeType === 3) {
        const frag = document.createDocumentFragment();
        node.textContent.split(/(\s+)/).forEach(part => {
          if (!part) return;
          if (/^\s+$/.test(part)) { frag.appendChild(document.createTextNode(" ")); return; }
          const w = document.createElement("span");
          w.className = "w";
          w.innerHTML = `<span style="transition-delay:${i++ * 70}ms">${part}</span>`;
          frag.appendChild(w);
        });
        node.replaceWith(frag);
      } else if (node.nodeType === 1) {
        [...node.childNodes].forEach(wrap);
      }
    };
    [...el.childNodes].forEach(wrap);
  });
  // Palavras do manifesto (efeito "acender" com a rolagem)
  const manifesto = $("[data-scrub]");
  let scrubWords = [];
  if (manifesto) {
    manifesto.innerHTML = manifesto.textContent.trim().split(/\s+/).map(w => `<span class="sw">${w}</span>`).join(" ");
    scrubWords = $$(".sw", manifesto);
  }

  /* ---------- Sem animação de entrada: o hero já abre pronto ---------- */
  body.classList.add("is-ready");
  $(".hero [data-split-words]")?.classList.add("is-in");
  $$(".hero .reveal").forEach(el => el.classList.add("is-in"));

  /* ---------- Revelações ao rolar ---------- */
  $$("[data-delay]").forEach(el => el.style.setProperty("--d", el.dataset.delay));
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      if (el.closest(".hero") && !body.classList.contains("is-ready")) return;
      el.classList.add("is-in");
      if (el.dataset.count !== undefined) countUp(el);
      $$("[data-count]", el).forEach(countUp);
      io.unobserve(el);
    });
  }, { threshold: 0.18, rootMargin: "0px 0px -6% 0px" });
  $$(".reveal, .reveal-clip, [data-split-words]:not(.hero__title), .steps").forEach(el => io.observe(el));

  /* ---------- Contadores ---------- */
  function countUp(el) {
    if (el.dataset.done) return;
    el.dataset.done = 1;
    const end = +el.dataset.count;
    const dur = 1600;
    const t0 = performance.now();
    const tick = now => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(1 - p, 4);
      el.textContent = Math.round(end * e);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  /* ---------- Header, progresso, botão WhatsApp, parallax ---------- */
  const header = $(".header");
  const progress = $(".scroll-progress");
  const whatsFloat = $(".whats-float");
  const featureBg = $(".feature__bg");
  const hero = $(".hero");
  let lastY = 0;
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY;
    const h = document.documentElement.scrollHeight - innerHeight;
    progress.style.transform = `scaleX(${h > 0 ? y / h : 0})`;
    header.classList.toggle("is-scrolled", y > 40);
    header.classList.toggle("is-hidden", y > lastY && y > innerHeight * 0.9 && !body.classList.contains("menu-open"));
    lastY = y;
    whatsFloat.classList.toggle("is-visible", y > innerHeight * 0.6);

    // Manifesto: acende palavra por palavra
    if (manifesto && scrubWords.length) {
      const r = manifesto.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, (innerHeight * 0.85 - r.top) / (r.height + innerHeight * 0.35)));
      const n = Math.round(p * scrubWords.length);
      scrubWords.forEach((w, i) => w.classList.toggle("on", i < n));
    }

    // Parallax do fundo do destaque
    if (featureBg && !reduceMotion) {
      const r = featureBg.parentElement.getBoundingClientRect();
      featureBg.style.transform = `translate3d(0, ${(r.top + r.height / 2 - innerHeight / 2) * -0.15}px, 0)`;
    }
    // Hero se afasta suavemente
    if (hero && !reduceMotion && y < innerHeight) {
      $(".hero__grid").style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
      $(".hero__grid").style.opacity = 1 - y / (innerHeight * 1.1);
    }
    ticking = false;
  };
  window.addEventListener("scroll", () => {
    if (!ticking) { requestAnimationFrame(onScroll); ticking = true; }
  }, { passive: true });
  onScroll();

  /* ---------- Link ativo no menu ---------- */
  const links = $$(".nav__link");
  const sections = links.map(l => $(l.getAttribute("href"))).filter(Boolean);
  const navIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === "#" + e.target.id));
      }
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => navIO.observe(s));

  /* ---------- Menu mobile ---------- */
  const burger = $(".burger");
  const menu = $("#menu-mobile");
  const toggleMenu = force => {
    const open = force ?? !body.classList.contains("menu-open");
    body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
    menu.setAttribute("aria-hidden", !open);
  };
  burger.addEventListener("click", () => toggleMenu());
  $$("a", menu).forEach(a => a.addEventListener("click", () => toggleMenu(false)));

  /* ---------- Cursor personalizado ---------- */
  if (finePointer && !reduceMotion) {
    const cursor = $(".cursor");
    const dot = $(".cursor__dot");
    const ring = $(".cursor__ring");
    let mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my;
    window.addEventListener("mousemove", e => {
      mx = e.clientX; my = e.clientY;
      cursor.classList.add("is-active");
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });
    const loop = () => {
      rx += (mx - rx) * 0.16; ry += (my - ry) * 0.16;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(loop);
    };
    loop();
    document.addEventListener("mouseover", e => {
      cursor.classList.toggle("is-hover", !!e.target.closest("a, button, [data-tilt]"));
    });
  }

  /* ---------- Botões magnéticos ---------- */
  if (finePointer && !reduceMotion) {
    $$(".magnetic").forEach(btn => {
      btn.addEventListener("mousemove", e => {
        const r = btn.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        btn.style.transform = `translate(${x * 0.22}px, ${y * 0.32}px)`;
      });
      btn.addEventListener("mouseleave", () => (btn.style.transform = ""));
    });
  }

  /* ---------- Inclinação 3D das capas ---------- */
  if (finePointer && !reduceMotion) {
    $$("[data-tilt]").forEach(el => {
      const max = el.classList.contains("book3d") ? 12 : 9;
      el.addEventListener("mousemove", e => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width;
        const py = (e.clientY - r.top) / r.height;
        el.style.transform = `rotateY(${(px - 0.5) * max * 2}deg) rotateX(${(0.5 - py) * max * 2}deg) translateZ(10px)`;
        el.style.setProperty("--mx", px * 100 + "%");
        el.style.setProperty("--my", py * 100 + "%");
      });
      el.addEventListener("mouseleave", () => (el.style.transform = ""));
    });
  }

  /* ---------- Leque de livros: efeito baralho (mouse e dedo) ---------- */
  const fan = $(".hero__fan");
  if (fan) {
    const fanBooks = $$(".fan__book", fan);
    let selected = null, selBeforeTouch = null, lastPointer = "mouse";
    fanBooks.forEach(btn => {
      const t = window.LIVROS?.[btn.dataset.book]?.titulo;
      if (t) btn.setAttribute("aria-label", `${t} — toque para destacar`);
    });
    const select = btn => {
      if (selected === btn) return;
      selected?.classList.remove("is-selected");
      selected = btn;
      btn?.classList.add("is-selected");
      fan.classList.toggle("has-selected", !!btn);
    };
    // livro mais próximo do dedo (pela posição do livro no leque, que não se mexe)
    const nearest = x => {
      let best = null, dist = Infinity;
      fanBooks.forEach(b => {
        const r = b.getBoundingClientRect();
        const d = Math.abs(r.left + r.width / 2 - x);
        if (d < dist) { dist = d; best = b; }
      });
      return best;
    };
    fan.addEventListener("pointerdown", e => (lastPointer = e.pointerType));
    fan.addEventListener("touchstart", e => {
      lastPointer = "touch";
      selBeforeTouch = selected;
      // tocar no botão "Leia o resumo" do livro já destacado não troca a seleção
      if (e.target.closest(".fan__cta") && e.target.closest(".fan__book") === selected) return;
      select(nearest(e.touches[0].clientX));
    }, { passive: true });
    fan.addEventListener("touchmove", e => select(nearest(e.touches[0].clientX)), { passive: true });

    fan.addEventListener("click", e => {
      const btn = e.target.closest(".fan__book");
      if (!btn) return;
      const onCta = e.target.closest(".fan__cta");
      if (lastPointer === "touch") {
        // celular: só abre o resumo pelo botão, e só se o livro já estava destacado
        if (onCta && btn === selected && btn === selBeforeTouch) return; // deixa abrir o resumo
        e.preventDefault(); e.stopPropagation();
        select(btn);
        return;
      }
      // computador: clicar no livro também abre o resumo
      if (!onCta) { e.preventDefault(); e.stopPropagation(); $(".fan__cta", btn).click(); }
    });
    // tocar fora do leque tira o destaque
    document.addEventListener("touchstart", e => { if (!fan.contains(e.target)) select(null); }, { passive: true });
  }

  /* ---------- Parallax dos livros no hero ---------- */
  const stack = $("[data-parallax-mouse]");
  if (stack && finePointer && !reduceMotion) {
    hero.addEventListener("mousemove", e => {
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      // só desliza levemente (sem girar em 3D), para não embaralhar a ordem dos livros
      stack.style.transform = `translate3d(${x * 18}px, ${y * 12}px, 0)`;
    });
    hero.addEventListener("mouseleave", () => (stack.style.transform = ""));
  }

  /* ---------- Partículas de luz (hero) ---------- */
  const canvas = $(".hero__particles");
  if (canvas && !reduceMotion) {
    const ctx = canvas.getContext("2d");
    let w, h, dpr, parts = [];
    const resize = () => {
      dpr = Math.min(2, window.devicePixelRatio || 1);
      w = canvas.offsetWidth; h = canvas.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(90, (w * h) / 16000));
      parts = Array.from({ length: n }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        vy: -(Math.random() * 0.25 + 0.05), vx: (Math.random() - 0.5) * 0.12,
        a: Math.random() * 0.6 + 0.15, t: Math.random() * Math.PI * 2
      }));
    };
    let visible = true;
    new IntersectionObserver(([e]) => (visible = e.isIntersecting)).observe(canvas);
    const draw = () => {
      if (visible) {
        ctx.clearRect(0, 0, w, h);
        parts.forEach(p => {
          p.x += p.vx; p.y += p.vy; p.t += 0.02;
          if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
          const alpha = p.a * (0.6 + Math.sin(p.t) * 0.4);
          ctx.beginPath();
          ctx.fillStyle = `rgba(255, 228, 170, ${alpha})`;
          ctx.shadowColor = "rgba(233, 203, 139, .8)";
          ctx.shadowBlur = 8;
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fill();
        });
      }
      requestAnimationFrame(draw);
    };
    resize();
    window.addEventListener("resize", resize);
    draw();
  }


  /* ---------- Serviços: vitrine com setas, números e troca automática ---------- */
  const show = $("[data-showcase]");
  if (show) {
    const scenes = $$(".scene", show);
    const panels = $$(".svc-panel", show);
    const tabs = $$(".svc-tab");
    const numEl = $(".showcase__num", show);
    const cta = $(".showcase__cta", show);
    const bar = $(".showcase__progress", show);
    const total = panels.length;
    const AUTOPLAY = 7000;
    let cur = 0, timer = null, inView = false, userTook = false;

    const go = (i, dir) => {
      i = (i + total) % total;
      const d = dir ?? (i > cur ? 1 : -1);
      show.style.setProperty("--dir", d);
      cur = i;
      scenes.forEach(sc => sc.classList.toggle("is-active", +sc.dataset.scene === i));
      panels.forEach(p => { const on = +p.dataset.i === i; p.classList.toggle("is-active", on); p.setAttribute("aria-hidden", !on); });
      tabs.forEach(t => { const on = +t.dataset.go === i; t.classList.toggle("is-active", on); t.setAttribute("aria-selected", on); });
      numEl.textContent = String(i + 1).padStart(2, "0");
      const nome = $("h3", panels[i]).textContent;
      cta.href = `https://wa.me/${window.WHATS_NUMERO}?text=${encodeURIComponent(`Olá! Tenho interesse no serviço "${nome}" da Editora Recomeços.`)}`;
      restart();
    };
    const restart = () => {
      clearTimeout(timer);
      bar.classList.remove("is-running"); void bar.offsetWidth;
      if (!inView || reduceMotion) return;
      bar.classList.add("is-running");
      timer = setTimeout(() => { if (!show.classList.contains("is-paused")) go(cur + 1, 1); else restart(); }, userTook ? AUTOPLAY * 1.6 : AUTOPLAY);
    };
    show.style.setProperty("--autoplay", AUTOPLAY + "ms");

    $("[data-next]", show).addEventListener("click", () => { userTook = true; show.style.setProperty("--autoplay", AUTOPLAY * 1.6 + "ms"); go(cur + 1, 1); });
    $("[data-prev]", show).addEventListener("click", () => { userTook = true; show.style.setProperty("--autoplay", AUTOPLAY * 1.6 + "ms"); go(cur - 1, -1); });
    tabs.forEach(t => t.addEventListener("click", () => { userTook = true; show.style.setProperty("--autoplay", AUTOPLAY * 1.6 + "ms"); go(+t.dataset.go); }));

    // pausa enquanto o mouse está sobre a vitrine
    show.addEventListener("mouseenter", () => show.classList.add("is-paused"));
    show.addEventListener("mouseleave", () => { show.classList.remove("is-paused"); restart(); });

    // setas do teclado quando a seção está visível
    document.addEventListener("keydown", e => {
      if (!inView || body.classList.contains("modal-open")) return;
      if (e.key === "ArrowRight") go(cur + 1, 1);
      if (e.key === "ArrowLeft") go(cur - 1, -1);
    });

    // deslizar com o dedo (celular)
    const stageEl = $(".showcase__stage", show);
    let sx = null;
    stageEl.addEventListener("touchstart", e => (sx = e.touches[0].clientX), { passive: true });
    stageEl.addEventListener("touchend", e => {
      if (sx === null) return;
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 40) { userTook = true; go(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); }
      sx = null;
    });

    new IntersectionObserver(([e]) => { inView = e.isIntersecting; restart(); }, { threshold: 0.35 }).observe(show);
    go(0, 1);
  }

  /* ---------- Modal dos livros ---------- */
  const modal = $("#modal");
  let lastFocus = null;
  const openBook = id => {
    const b = window.LIVROS?.[id];
    if (!b) return;
    lastFocus = document.activeElement;
    $("#modal-img").src = b.imagem;
    $("#modal-img").alt = "Capa do livro " + b.titulo;
    $("#modal-kicker").textContent = b.kicker;
    $("#modal-title").textContent = b.titulo;
    $("#modal-author").textContent = b.autor;
    $("#modal-text").innerHTML = b.resumo.map(p => (p.startsWith("<span class='modal__subtitle'") ? `<div>${p}</div>` : `<p>${p}</p>`)).join("");
    $("#modal-price").innerHTML = b.preco ? `<small>R$</small>${b.preco}` : `<span class="price__text">${b.precoTexto || "Consulte"}</span>${b.precoNota ? `<em class="price__note">${b.precoNota}</em>` : ""}`;
    const orig = $("#modal-original");
    if (b.imagemOriginal) { $("img", orig).src = b.imagemOriginal; $("img", orig).alt = "Capa original de " + b.titulo; orig.hidden = false; }
    else orig.hidden = true;
    const msg = b.mensagem || (b.preco
      ? `Olá! Tenho interesse no livro "${b.titulo}" (R$ ${b.preco}). Como faço para comprar?`
      : `Olá! Tenho interesse no livro "${b.titulo}". Pode me passar mais informações?`);
    $("#modal-whats").href = `https://wa.me/${window.WHATS_NUMERO}?text=${encodeURIComponent(msg)}`;
    $("#modal-whats span").textContent = b.cta || "Comprar pelo WhatsApp";
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    body.classList.add("modal-open");
    $(".modal__panel").scrollTop = 0;
    setTimeout(() => $(".modal__close").focus(), 50);
  };
  const closeBook = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    body.classList.remove("modal-open");
    lastFocus?.focus();
  };
  document.addEventListener("click", e => {
    const opener = e.target.closest("[data-open-book]");
    if (opener) { e.preventDefault(); openBook(opener.dataset.openBook); }
    if (e.target.closest("[data-close]")) closeBook();
  });
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
      if (modal.classList.contains("is-open")) closeBook();
      if (body.classList.contains("menu-open")) toggleMenu(false);
    }
  });
})();
