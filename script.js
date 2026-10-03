(function () {
  const nav = document.getElementById("site-nav");
  const hamburger = document.getElementById("hamburger");
  const mobileMenu = document.getElementById("mobile-menu");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setMenuOpen(open) {
    if (!hamburger || !mobileMenu) return;
    hamburger.classList.toggle("is-open", open);
    mobileMenu.classList.toggle("is-open", open);
    hamburger.setAttribute("aria-expanded", open ? "true" : "false");
  }

  if (hamburger) {
    hamburger.addEventListener("click", (e) => {
      e.stopPropagation();
      setMenuOpen(!mobileMenu.classList.contains("is-open"));
    });
  }

  document.querySelectorAll("#mobile-menu a").forEach((link) => {
    link.addEventListener("click", () => setMenuOpen(false));
  });

  document.addEventListener("click", (e) => {
    if (!mobileMenu || !mobileMenu.classList.contains("is-open")) return;
    if (nav && nav.contains(e.target)) return;
    setMenuOpen(false);
  });

  window.addEventListener(
    "scroll",
    () => {
      if (!nav) return;
      nav.classList.toggle("is-scrolled", window.scrollY > 40);
    },
    { passive: true }
  );

  if (reduceMotion) {
    document.querySelectorAll(".reveal").forEach((el) => el.classList.add("is-visible"));
    document.querySelectorAll(".section-line").forEach((el) => el.classList.add("is-drawn"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
  );

  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

  const lineObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-drawn");
        lineObserver.unobserve(entry.target);
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll(".section-line").forEach((el) => lineObserver.observe(el));
})();
