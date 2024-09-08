import { initGsapAnimate } from "./modules/gsap.js";
import { initSwiper } from "./modules/swiper.js";
import { toggleMediaBlock } from "./modules/toggleMediaBlock.js";
import { initVideos } from "./modules/initVideos.js";
import Toastify from "toastify-js";
import "toastify-js/src/toastify.css";

import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

initGsapAnimate(); // анимации библиотеки gsap
initSwiper(); // инициализация библиотеки swiper
toggleMediaBlock(); // логика переключения блоков в секции "медиа" (фото/видео/shorts)

// логика переключения кнопок "к кейсам" (выпадающие кнопки по нажатию)
const btns = document.querySelectorAll(".btn");
const mediaQuery = window.matchMedia("(min-width: 768px)");

btns.forEach((el) => {
  el.addEventListener("click", () => {
    const btnWrapper = el
      .closest(".btns-wrapper")
      .querySelector(".btn-wrapper");
    btnWrapper.classList.toggle("hidden");
  });
});

// логика открывающегося меню "бургер"
const openModalBtn = document.querySelector(".burger");
const menu = document.querySelector(".menu");
const closeModelBtn = document.querySelector(".menu-header button");
const body = document.querySelector("body");

openModalBtn.addEventListener("click", () => {
  menu.style.display = "flex";
  body.classList.add("menu-isOpen");
  body.style.touchAction = "none";
  const links = document.querySelectorAll(".menu-list a");

  links.forEach((el) => {
    el.style.color = "#ffffff";
  });
});

closeModelBtn.addEventListener("click", () => {
  menu.style.display = "none";
  body.classList.remove("menu-isOpen");
  body.style.touchAction = "auto";
});

// логика свернуть/подробнее блока с текстом в разделе "обо мне"

if (!mediaQuery.matches) {
  console.log("2");
  const btnWrap = document.querySelector(".description__block-more");
  const btnMore = document.querySelector(".btn-more");
  const descrBlock = document.querySelector(
    ".about .description__block:nth-child(2) .description__block-wrapper"
  );
  const descrBlockMob = document.querySelector(
    ".about .description__block:nth-child(2) .description__block-wrapper.mobile"
  );
  descrBlock.classList.add("hidden");
  descrBlockMob.classList.remove("hidden");
  btnWrap.classList.remove("hidden");

  btnMore.addEventListener("click", () => {
    descrBlock.classList.toggle("hidden");
    descrBlockMob.classList.toggle("hidden");
    if (descrBlockMob.classList.contains("hidden")) {
      btnMore.innerText = "Свернуть";
    } else {
      btnMore.innerText = "Подробнее";
    }
  });
}
// инициализация Fancybox
Fancybox.bind("[data-fancybox]", {});

// логика сокращения текста в блоке философия
if (!mediaQuery.matches) {
  const textBlocks = document.querySelectorAll(
    ".philosophy-items__element-wrapper span"
  );

  textBlocks.forEach((item) => {
    const text = item.textContent;
    if (text.length > 45) {
      const str = text.substring(0, 45);
      item.innerHTML = `${str}...`;
    }
  });
}

// Логика с перекрашиванием шапки по скроллу из черного шрифта в белый и наооборот
const elem = document.querySelector(".main");
const headerBg = document.querySelector(".header__bg");

document.addEventListener("scroll", function () {
  const posTop = elem.getBoundingClientRect().top;

  // Блок достиг верхней границы экрана (или выше)
  headerBg.classList.toggle("header--black", posTop <= 30);
});

// константы для разделов видео и shorts
export const mediaBlocks = {
  video: "video",
  shorts: "shorts",
};

// в эти переменные запишим функции, которые вернуться при инициализации видео и shorts, через них будем удалять обработчики
let clearVideo;
let clearShorts;

// так как надо выставить продолжительность времени в видео, то надо подождать, пока оно загрузится. Запускаем функцию, внутри которой будум инициализировать запуск функций с видео и shorts, в зависимости от размера экрана
window.addEventListener("load", () => {
  resizeFn();
});

// точки перелома экрана
var widths = [360, 767, 1199];
let flag;
let lastWidthVal = window.innerWidth;

function resizeFn() {
  const videosElememt = document.querySelectorAll("video");
  let currentWidth = window.innerWidth;
  let direction;
  if (currentWidth > lastWidthVal) {
    direction = "up";
  } else if (currentWidth < lastWidthVal) {
    direction = "down";
  } else {
    direction = null;
  }
  lastWidthVal = currentWidth;

  if (window.innerWidth >= widths[0] && window.innerWidth < widths[1]) {
    let id = 1;
    if (flag !== id) {
      // console.log("мобилка", direction);
      if (direction === "down") {
        if (clearVideo) clearVideo();
        if (clearShorts) clearShorts();

        videosElememt.forEach((item) => {
          item.setAttribute("controls", "true");
        });
      }
    }
    flag = id;
  } else if (window.innerWidth >= widths[1] && window.innerWidth < widths[2]) {
    let id = 2;
    if (flag !== id) {
      // console.log("планшет", direction);
      if (!direction) {
        clearVideo = initVideos(mediaBlocks.video);
        clearShorts = initVideos(mediaBlocks.shorts);
        videosElememt.forEach((item) => {
          item.removeAttribute("controls");
        });
      }
      if (direction === "up") {
        clearVideo = initVideos(mediaBlocks.video);
        clearShorts = initVideos(mediaBlocks.shorts);
        videosElememt.forEach((item) => {
          item.removeAttribute("controls");
        });
      }
    }

    flag = id;
  } else {
    let id = 3;
    if (flag !== id) {
      // console.log("десктоп", direction);
      if (!direction) {
        clearVideo = initVideos(mediaBlocks.video);
        clearShorts = initVideos(mediaBlocks.shorts);

        videosElememt.forEach((item) => {
          item.removeAttribute("controls");
        });
      }
    }
    flag = id;
  }
}
window.onresize = resizeFn;

// копирование в буфер обмена
function fallbackCopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    var msg = successful ? "successful" : "unsuccessful";
    console.log("Fallback: Copying text command was " + msg);
  } catch (err) {
    console.error("Fallback: Oops, unable to copy", err);
  }

  document.body.removeChild(textArea);
}
function copyTextToClipboard(text) {
  if (!navigator.clipboard) {
    fallbackCopyTextToClipboard(text);
    return;
  }
  navigator.clipboard.writeText(text).then(
    function () {
      console.log("Async: Copying to clipboard was successful!");
    },
    function (err) {
      console.error("Async: Could not copy text: ", err);
    }
  );
}
document.addEventListener("click", (e) => {
  if (e.target.closest(".go-over") || e.target.closest(".go-over-mobile")) {
    copyTextToClipboard(window.location.href);
    Toastify({
      text: "Ссылка скопирована",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "bottom", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #ff695a, #ff988f)",
      },
      onClick: function () {}, // Callback after click
    }).showToast();
  }
});
