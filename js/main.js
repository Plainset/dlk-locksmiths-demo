(function () {
  "use strict";

  // ---------- Mobile nav toggle ----------
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ---------- Scroll reveal ----------
  var revealEls = document.querySelectorAll("[data-reveal]");

  if (revealEls.length) {
    var prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      revealEls.forEach(function (el) {
        el.classList.add("is-visible");
      });
    } else {
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
      );

      revealEls.forEach(function (el) {
        // Standing rule: elements already in the viewport at load never
        // fire an intersection "change", so check their position first
        // and reveal immediately instead of leaving above-the-fold
        // content invisible.
        var rect = el.getBoundingClientRect();
        var inViewport =
          rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom > 0;

        if (inViewport) {
          el.classList.add("is-visible");
        } else {
          observer.observe(el);
        }
      });
    }
  }
})();
