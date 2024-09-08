import Swiper from "swiper/bundle";
import "swiper/css/bundle";

const mediaQuery = window.matchMedia("(min-width: 768px)");

export const initSwiper = () => {
  // инициализация слайдера в секции "Медиа" (фото)

  const technologies = new Swiper(".swiper-technologies__wrapper", {
    slideToClickedSlide: false,
    slidesPerView: 3,
    spaceBetween: 40,
    allowTouchMove: true,
    speed: 1000,
    loop: true,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
      768: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
      900: {
        slidesPerView: 6,
        spaceBetween: 50,
      },

      1050: {
        slidesPerView: 7,
        spaceBetween: 50,
      },
      1300: {
        slidesPerView: 8,
        spaceBetween: 60,
      },
      1600: {
        slidesPerView: 8,
        spaceBetween: 80,
      },
      1700: {
        slidesPerView: 8,
        spaceBetween: 100,
      },
      1800: {
        slidesPerView: 8,
        spaceBetween: 120,
      },
    },
  });

  // функционал раскрытия попапа при клике на любой слайд в технологиях
  const overlay = document.querySelector(".overlay");
  const body = document.querySelector("body");
  let flag = false;
  const bodyWrapper = document.querySelector(".wrapper");
  const header = document.querySelector(".header");

  // функция вернет размер бокового скролла
  const scrollWidth = () => {
    let div = document.createElement("div");

    div.style.overflowY = "scroll";
    div.style.width = "50px";
    div.style.height = "50px";

    // мы должны вставить элемент в документ, иначе размеры будут равны 0
    document.body.append(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;

    div.remove();

    return scrollWidth;
  };

  body.addEventListener("click", (e) => {
    const popup = document.querySelector(".popup");

    if (popup) {
      popup.remove();
      overlay.classList.remove("active");
    }

    if (e.target.closest(".swiper-technologies__wrapper-item")) {
      bodyWrapper.style.paddingRight = `${scrollWidth()}px`;
      header.style.display = "none";
      body.style.overflowY = "hidden";
      body.style.touchAction = "none";
      technologies.autoplay.stop();
      flag = true;
      overlay.classList.add("active");
      const currentElement = e.target
        .closest(".swiper-technologies__wrapper-item")
        .querySelector("img");
      const path = currentElement.getAttribute("src");
      const markup = `<div class='popup'>
        <img src=${path}>
      </div>`;

      body.insertAdjacentHTML("beforeend", markup);
    } else {
      if (flag) {
        technologies.autoplay.start();
        bodyWrapper.style.paddingRight = "0px";
        header.style.display = "block";
        body.style.overflowY = "visible";
        body.style.touchAction = "auto";
        flag = false;
      }
    }
  });

  // инициализация слайдера в секции "философия" (только на мобилке)
  new Swiper(".philosophy-items.mobile", {
    slideToClickedSlide: true,
    slidesPerView: 2,
    spaceBetween: 10,
    centeredSlides: false,
    loop: true,
    speed: 1200,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    breakpoints: {
      360: {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      530: {
        slidesPerView: 1.5,
        spaceBetween: 10,
      },
      720: {
        slidesPerView: 1.8,
        spaceBetween: 20,
      },
      925: {
        slidesPerView: 2.3,
        spaceBetween: 30,
      },
    },
  });
  // инициализация слайдера в секции "Медиа" (фото)
  new Swiper(".photo", {
    navigation: {
      nextEl: ".media-button-next",
      prevEl: ".media-button-prev",
    },
    slideToClickedSlide: true,
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    speed: 1200,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    pagination: {
      el: ".photo .swiper-pagination",
      dynamicBullets: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
      1200: {
        slidesPerView: 2.03,
      },
    },
  });
  // инициализация слайдера в секции "Медиа" (видео)
  new Swiper(".video", {
    navigation: {
      nextEl: ".media-button-next",
      prevEl: ".media-button-prev",
    },
    slideToClickedSlide: true,
    slidesPerView: 1,
    spaceBetween: 30,
    centeredSlides: true,
    loop: true,
    speed: 1200,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    // allowTouchMove: false,
    pagination: {
      el: ".video .swiper-pagination",
      dynamicBullets: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 1,
      },
      1200: {
        slidesPerView: 2.03,
      },
    },
  });
  // инициализация слайдера в секции "Медиа" (shorts)
  new Swiper(".shorts", {
    navigation: {
      nextEl: ".media-button-next",
      prevEl: ".media-button-prev",
    },
    slidesPerView: 3,
    slideToClickedSlide: true,
    spaceBetween: 10,
    speed: 1200,
    observer: true,
    observeParents: true,
    observeSlideChildren: true,
    allowTouchMove: true,
    breakpoints: {
      360: {
        slidesPerView: 1.2,
        spaceBetween: 30,
      },
      390: {
        slidesPerView: 1.8,
        spaceBetween: 30,
      },
      450: {
        slidesPerView: 2.5,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 50,
      },
      991: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
      1200: {
        slidesPerView: 5,
        spaceBetween: 50,
      },
      1600: {
        slidesPerView: 5,
        spaceBetween: 70,
      },
      1900: {
        slidesPerView: 5,
        spaceBetween: 90,
      },
    },
  });
};
