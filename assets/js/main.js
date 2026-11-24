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

  /* ---------- Parallax dos livros no hero ---------- */
  const stack = $("[data-parallax-mouse]");
  if (stack && finePointer && !reduceMotion) {
    hero.addEventListener("mousemove", e => {
      const x = e.clientX / innerWidth - 0.5;
      const y = e.clientY / innerHeight - 0.5;
      stack.style.transform = `rotateY(${x * 10}deg) rotateX(${-y * 8}deg) translate3d(${x * 20}px, ${y * 14}px, 0)`;
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
    $("#modal-price").innerHTML = `<small>R$</small>${b.preco}`;
    const msg = `Olá! Tenho interesse no livro "${b.titulo}" (R$ ${b.preco}). Como faço para comprar?`;
    $("#modal-whats").href = `https://wa.me/${window.WHATS_NUMERO}?text=${encodeURIComponent(msg)}`;
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
