import "./../libs/gsap/gsap.min.js";
import "./../libs/gsap/ScrollTrigger.min.js";
import "./../libs/gsap/ScrollSmoother.min.js";

export const initGsapAnimate = () => {
  const mediaQuery = window.matchMedia("(min-width: 768px)");

  // инициализация библиотеки GSAP
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

  // логика перехода к якорным ссылкам с меню бургера (с gsap обычный переход по id не работает)

  const links = document.querySelectorAll(".menu-list a");

  links.forEach((item) => {
    item.addEventListener("click", (e) => {
      links.forEach((el) => {
        el.style.color = "#ffffff";
      });

      e.target.style.color = "#000000";
      e.preventDefault();
      const path = e.target.getAttribute("data-id");
      const name = e.target.getAttribute("data-name");
      const elem = document.querySelector(`#${path}`);
      const closeModelBtn = document.querySelector(".menu-header button");

      const btnMore = document.querySelector(".btn-more");
      const descrBlock = document.querySelector(
        ".about .description__block:nth-child(2) .description__block-wrapper"
      );
      const descrBlockMob = document.querySelector(
        ".about .description__block:nth-child(2) .description__block-wrapper.mobile"
      );

      const closeAboutMe = () => {
        if (descrBlockMob.classList.contains("hidden")) {
          descrBlock.classList.toggle("hidden");
          descrBlockMob.classList.toggle("hidden");
          btnMore.innerText = "Подробнее";
        }
      };

      if (name === "photo") {
        const btn = document.querySelector(
          '.media-wrapper__menu-item[data-title="photo"]'
        );
        btn.click();
        gsap.to(window, { duration: 1, scrollTo: elem });
        if (!mediaQuery.matches) closeAboutMe();
        window.history.pushState(
          {},
          "",
          window.location.origin + "#media-wrapper"
        );
      } else if (name === "video") {
        const btn = document.querySelector(
          '.media-wrapper__menu-item[data-title="video"]'
        );
        btn.click();
        gsap.to(window, { duration: 1, scrollTo: elem });
        if (!mediaQuery.matches) closeAboutMe();
        window.history.pushState({}, "", window.location.origin + `#${name}`);
      } else if (name === "shorts") {
        const btn = document.querySelector(
          '.media-wrapper__menu-item[data-title="shorts"]'
        );
        btn.click();
        gsap.to(window, { duration: 1, scrollTo: elem });
        if (!mediaQuery.matches) closeAboutMe();
        window.history.pushState({}, "", window.location.origin + `#${name}`);
      } else if (path === "about") {
        if (!mediaQuery.matches && descrBlock.classList.contains("hidden")) {
          descrBlock.classList.toggle("hidden");
          descrBlockMob.classList.toggle("hidden");
          btnMore.innerText = "Свернуть";
        }
        gsap.to(window, { duration: 1, scrollTo: elem });
        window.history.pushState({}, "", window.location.origin + `#${path}`);
      } else {
        gsap.to(window, { duration: 1, scrollTo: elem });
        if (!mediaQuery.matches) closeAboutMe();
        window.history.pushState({}, "", window.location.origin + `#${path}`);
      }

      if (!mediaQuery.matches) {
        closeModelBtn.click();
      }
    });
  });

  // работает на десктопах и экранах без сенсора
  if (ScrollTrigger.isTouch !== 1 && mediaQuery.matches) {
    ScrollSmoother.create({
      wrapper: ".wrapper",
      content: ".content",
      smooth: 1.5,
      effects: true,
    });

    // секция 'about', блок с фотографией слева
    gsap.fromTo(
      ".about .description__block:nth-child(1)",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".about .description__block:nth-child(1)",
          start: "-1050",
          end: "-100",
          scrub: true,
        },
      }
    );

    // секция 'about', блок с текстом справа (заголовок)
    gsap.fromTo(
      ".about .description__block:nth-child(2) .title",
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".about .description__block:nth-child(2) .title",
          start: "-1100",
          end: "-300",
          scrub: true,
        },
      }
    );

    // секция 'about', блок с текстом справа (1вый абзац)
    gsap.fromTo(
      ".about .description__block:nth-child(2) span:nth-child(1)",
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".about .description__block:nth-child(2) span:nth-child(1)",
          start: "-1050",
          end: "-300",
          scrub: true,
        },
      }
    );

    // секция 'about', блок с текстом справа (2ой абзац)
    gsap.fromTo(
      ".about .description__block:nth-child(2) span:nth-child(2)",
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".about .description__block:nth-child(2) span:nth-child(2)",
          start: "-1000",
          end: "-300",
          scrub: true,
        },
      }
    );

    // секция 'idea'
    gsap.fromTo(
      ".idea .container",
      { opacity: 0 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".idea .container",
          start: "-850",
          end: "-300",
          scrub: true,
        },
      }
    );

    // секция 'team'
    gsap.fromTo(
      ".team__content",
      { opacity: 0 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".team__content",
          start: "-850",
          end: "-300",
          scrub: true,
        },
      }
    );

    // секция 'technologies'
    gsap.fromTo(
      ".technologies .container",
      { opacity: 0 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".technologies .container",
          start: "-850",
          end: "-300",
          scrub: true,
        },
      }
    );

    // секция 'philosophy', блок с фотографией справа
    gsap.fromTo(
      ".philosophy .description__block:nth-child(2)",
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".philosophy .description__block:nth-child(2)",
          start: "-850",
          end: "-100",
          scrub: true,
        },
      }
    );

    // секция 'philosophy', блок с текстом слева (заголовок)
    gsap.fromTo(
      ".philosophy .description__block:nth-child(1) .title",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".philosophy .description__block:nth-child(1) .title",
          start: "-950",
          end: "-500",
          scrub: true,
        },
      }
    );

    // секция 'philosophy', блок с текстом слева (описание)
    gsap.fromTo(
      ".philosophy .description__block:nth-child(1) span",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".philosophy .description__block:nth-child(1) span",
          start: "-930",
          end: "-450",
          scrub: true,
        },
      }
    );

    // секция 'philosophy', блок с кнопкой
    gsap.fromTo(
      ".philosophy .description__block:nth-child(1) button",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".philosophy .description__block:nth-child(1) button",
          start: "-910",
          end: "-400",
          scrub: true,
        },
      }
    );

    // секция 'philosophy-items', блок по центру (изображение)
    gsap.fromTo(
      ".philosophy-items .philosophy-items__element:nth-child(2) img",
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger:
            ".philosophy-items .philosophy-items__element:nth-child(2) img",
          start: "-950",
          end: "-300",
          scrub: true,
        },
      }
    );

    // секция 'philosophy-items', блок по центру (заголовок)
    gsap.fromTo(
      ".philosophy-items .philosophy-items__element:nth-child(2) h3",
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger:
            ".philosophy-items .philosophy-items__element:nth-child(2) h3",
          start: "-900",
          end: "-400",
          scrub: true,
        },
      }
    );

    // секция 'philosophy-items', блок по центру (описание)
    gsap.fromTo(
      ".philosophy-items .philosophy-items__element:nth-child(2) span",
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger:
            ".philosophy-items .philosophy-items__element:nth-child(2) span",
          start: "-800",
          end: "-400",
          scrub: true,
        },
      }
    );

    // секция 'philosophy-items', блок слева (изображение)
    gsap.fromTo(
      ".philosophy-items .philosophy-items__element:nth-child(1)",
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".philosophy-items .philosophy-items__element:nth-child(1)",
          start: "-950",
          end: "-300",
          scrub: true,
        },
      }
    );

    // секция 'philosophy-items', блок слева (заголовок)
    gsap.fromTo(
      ".philosophy-items .philosophy-items__element:nth-child(1) h3",
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger:
            ".philosophy-items .philosophy-items__element:nth-child(1) h3",
          start: "-900",
          end: "-400",
          scrub: true,
        },
      }
    );

    // секция 'philosophy-items', блок слева (описание)
    gsap.fromTo(
      ".philosophy-items .philosophy-items__element:nth-child(1) span",
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger:
            ".philosophy-items .philosophy-items__element:nth-child(1) span",
          start: "-800",
          end: "-400",
          scrub: true,
        },
      }
    );

    // секция 'philosophy-items', блок справа (изображение)
    gsap.fromTo(
      ".philosophy-items .philosophy-items__element:nth-child(3)",
      { opacity: 0, x: 50 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".philosophy-items .philosophy-items__element:nth-child(3)",
          start: "-950",
          end: "-300",
          scrub: true,
        },
      }
    );

    // секция 'philosophy-items', блок справа (заголовок)
    gsap.fromTo(
      ".philosophy-items .philosophy-items__element:nth-child(3) h3",
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger:
            ".philosophy-items .philosophy-items__element:nth-child(3) h3",
          start: "-900",
          end: "-400",
          scrub: true,
        },
      }
    );

    // секция 'philosophy-items', блок справа (описание)
    gsap.fromTo(
      ".philosophy-items .philosophy-items__element:nth-child(3) span",
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger:
            ".philosophy-items .philosophy-items__element:nth-child(3) span",
          start: "-800",
          end: "-400",
          scrub: true,
        },
      }
    );

    // секция с медиа контентом (навигация)
    gsap.fromTo(
      ".media-wrapper__menu",
      { opacity: 0 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".media-wrapper__menu",
          start: "-850",
          end: "-300",
          scrub: true,
        },
      }
    );
    // секция с медиа контентом
    gsap.fromTo(
      ".media",
      { opacity: 0 },
      {
        opacity: 1,
        x: 0,
        scrollTrigger: {
          trigger: ".media",
          start: "-850",
          end: "-300",
          scrub: true,
        },
      }
    );
  }
};
