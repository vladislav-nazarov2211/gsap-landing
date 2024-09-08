export const toggleMediaBlock = () => {
  // блок с кнопками в навигации (фото/видео/...)
  const btnsBlock = document.querySelector(".media-wrapper__menu");
  // сами кнопки навигации
  const btns = document.querySelectorAll(".media-wrapper__menu button");
  // секция со слайдерами для фото/видео...
  const mediaBlocks = document.querySelectorAll(".media-wrapper .media");

  // костыль, при открытии слайдера с видео, последнее видео не отображается куском с левой стороны, только в момент прокрутки, поэтому при инициализации принудительно один раз крутану слайдер вперед
  const nextBtn = document.querySelector(".video .media-button-next");
  nextBtn.click();

  // при первом отображении сделаем первую кнопку 'фото' активной, а в html у секции фото не будет изначально класса hidden
  btns[0].style.color = "#000000";

  // ловим клик по кнопке навигации
  btnsBlock.addEventListener("click", (e) => {
    // если клик случился по кнопке
    if (e.target.classList.contains("media-wrapper__menu-item")) {
      // все кнопки окрашиваем изначально в неактивный цвет, потом перекрасим текущую в активный
      btns.forEach((el) => {
        el.style.color = "#8D8888";
      });
      // текущая кнопка
      const currentBtn = e.target.getAttribute("data-title");

      // проходим циклом по всем блокам
      mediaBlocks.forEach((item) => {
        // текущий блок, будем сравнивать названия на соответствие кнопке
        const currentBlock = item.getAttribute("data-title");
        // если совпали удалим класс 'hidden' и сделаем кнопку активной
        if (currentBlock === currentBtn) {
          if (currentBlock === "photo") {
            window.history.pushState({}, "", window.location.origin + `#media`);
          } else {
            window.history.pushState(
              {},
              "",
              window.location.origin + `#${currentBlock}`
            );
          }

          item.classList.remove("hidden");
          e.target.style.color = "#000000";
          // остальный блоки скроем
        } else {
          item.classList.add("hidden");
        }
      });
    }
  });

  const path = window.location.hash.split("#")[1];

  if (path) {
    if (path === "shorts") {
      const btn = document.querySelector(
        '.media-wrapper__menu-item[data-title="shorts"]'
      );
      const elem = document.querySelector(`#media-wrapper`);
      gsap.to(window, { duration: 1, scrollTo: elem });

      btn.click();
    } else if (path === "video") {
      const btn = document.querySelector(
        '.media-wrapper__menu-item[data-title="video"]'
      );
      const elem = document.querySelector(`#media-wrapper`);
      gsap.to(window, { duration: 1, scrollTo: elem });

      btn.click();
    } else {
      const elem = document.querySelector(`#${path}`);
      gsap.to(window, { duration: 1, scrollTo: elem });
    }
  }
};
