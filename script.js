(function () {
  const CONFIG = {
    ca: "fightpump",
    ticker: "$FIGHTMAN",
    name: "FIGHTMAN",
    x: "https://x.com/fightmancoin",
    xHandle: "@fightmancoin",
  };

  const SOL = "So11111111111111111111111111111111111111112";
  const pumpswap = `https://swap.pump.fun/?input=${SOL}&output=${CONFIG.ca}`;
  const dexscreener = `https://dexscreener.com/solana/${CONFIG.ca}`;
  const dexEmbed = `${dexscreener}?embed=1&loadChartSettings=0&chartLeftToolbar=0&chartTimeframesToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=usd&interval=15`;

  document.querySelectorAll("[data-pumpswap]").forEach((el) => {
    el.href = pumpswap;
  });

  document.querySelectorAll("[data-dex]").forEach((el) => {
    el.href = dexscreener;
  });

  document.querySelectorAll("[data-x]").forEach((el) => {
    el.href = CONFIG.x;
  });

  ["ca-text", "ca-inline", "ca-footer"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.textContent = CONFIG.ca;
  });

  const chartFrame = document.getElementById("chart-frame");
  if (chartFrame) chartFrame.src = dexEmbed;

  const copyBtn = document.getElementById("copy-ca");
  if (copyBtn) {
    copyBtn.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(CONFIG.ca);
        const prev = copyBtn.textContent;
        copyBtn.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.textContent = prev;
        }, 2000);
      } catch {
        copyBtn.textContent = "Failed";
        setTimeout(() => {
          copyBtn.textContent = "Copy";
        }, 2000);
      }
    });
  }

  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const header = document.querySelector(".site-header");
  if (header) {
    window.addEventListener("scroll", () => {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }, { passive: true });
  }

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReducedMotion) {
    document.querySelectorAll(".hero .reveal").forEach((el) => {
      requestAnimationFrame(() => el.classList.add("is-visible"));
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    document.querySelectorAll(".reveal, .stagger").forEach((el) => {
      if (!el.closest(".hero")) observer.observe(el);
    });

    const heroLogoWrap = document.querySelector(".hero-logo-wrap");
    const octagonRings = document.querySelectorAll(".octagon-ring");

    if (heroLogoWrap) {
      window.addEventListener("scroll", () => {
        const y = Math.min(window.scrollY, 400);
        heroLogoWrap.style.transform = `translateY(${y * 0.1}px) scale(${1 - y * 0.00015})`;
        octagonRings.forEach((ring, i) => {
          ring.style.opacity = String(Math.max(0, 1 - y / 500));
          ring.style.transform = `translate(-50%, -50%) rotate(${y * (i ? -0.12 : 0.18)}deg) scale(${1 + y * 0.0003})`;
        });
      }, { passive: true });
    }
  } else {
    document.querySelectorAll(".reveal, .stagger").forEach((el) => {
      el.classList.add("is-visible");
    });
  }
})();
