import { mediaBlocks } from "../index.js";

// видео-конвертер https://video-converter.com/
// конвертер фото https://imagecompressor.com/ru/

export const initVideos = (block) => {
  // все теги video
  const videos = document.querySelectorAll(`.${block} video`);
  // все теги с видео (обертки)
  const videosFrames = document.querySelectorAll(`.media__item--${block}`);
  // все ползунки времени (именно input)
  const progresses = document.querySelectorAll(`.${block} .progress`);
  // все ползунки громкости (именно input)
  const volumes = document.querySelectorAll(`.${block} .volume`);
  // все кнопки громкости
  const volumesBtns = document.querySelectorAll(`.${block} .volume-btn`);
  // в эту переменную будет записываться текущий включенный слайд (в разметке есть атрибут data-index)

  let index;

  // устанавливаем начальное значение в таймерах, если индекса нет, то это первая отрисовка и все таймеры равны своей временной длине. Если индекс есть,
  // то мы повторим процедуру для всех, кроме включенного видео. То есть у него останется текущее, а остальным покажем duration, это для того, чтобы при клике на следующее видео, все остальные имели инициализационные значения (изначальные)
  const initTimes = (index = null) => {
    const commonFunc = (item) => {
      // слайд
      const element = item.closest(".swiper-slide");
      // блок со временем
      const time = element.querySelector(".media__item-time");
      // минуты
      let minutes = Math.floor(item.duration / 60);
      // секунды
      let seconds = Math.floor(item.duration % 60);
      if (seconds < 10) {
        seconds = "0" + String(seconds);
      }

      // занесем значения в DOM
      if (item.duration) {
        time.innerText = `${minutes}:${seconds}`;
      } else {
        time.innerText = `0:00`;
      }
    };

    videos.forEach((item, i) => {
      // если индекс есть, значит мы уже что-то начали смотреть, остальные видео вернем в начальные значения
      if (index) {
        const num = item.getAttribute("data-index");
        // в начальное значение вернем все видео, кроме того, которое смотрим
        if (num != index) {
          commonFunc(item);
        }
      } else {
        commonFunc(item);
      }
    });
  };
  initTimes();

  // ниже функционал скрытия/раскрытия контролера в видео при наведении мышки
  let timer1 = 0;
  let timer2 = 0;
  let frame;
  let player;

  const mousemove = (e) => {
    clearTimeout(timer1);
    clearTimeout(timer2);
    timer1 = 0;
    timer2 = 0;
    player.classList.remove("smooth-hidden");

    timer2 = setTimeout(() => {
      player.classList.add("smooth-hidden");
    }, 2000);
  };

  const fadePlayer = (e) => {
    frame = e.target.closest(".media__item--video");
    player = frame.querySelector(".media__item-contol-wrapper");
    timer1 = setTimeout(() => {
      player.classList.add("smooth-hidden");
    }, 2000);

    frame.addEventListener("mousemove", mousemove);
  };

  const clearListener = () => {
    if (frame) {
      frame.removeEventListener("mousemove", mousemove);
    }
  };

  // Логика переключения при нажатии на play/pause

  const toggleVideoStatus = (e) => {
    // текущий слайд
    const currentElement = e.target.closest(".swiper-slide");
    // все слайды
    const elements = document.querySelectorAll(`.${block} .swiper-slide`);
    // текущий тег видео
    const videoElement = currentElement.querySelector("video");
    // текущая кнопка play
    const playBtn = currentElement.querySelector(".media__item-play");
    // текущая кнопка pause
    const pauseBtn = currentElement.querySelector(".media__item-pause");
    // текущая блок с ползунком
    const progressBlock = currentElement.querySelector(".media__item-progress");
    // кнопка "перейти"
    const goOverBtn = currentElement.querySelector(".go-over");
    // ползунок громкости (блок)
    const volumeBlock = currentElement.querySelector(".media__item-volume");
    // эта переменная объявлена выше, в нее запишем текущий слайд, которы включили или нажали на паузу
    index = videoElement.getAttribute("data-index");

    // если текущий элемент в паузе, то мы пройдемся циклом по всем видео слайдам, кроме текущего и вернем все значения к начальным, чтобы смотреть можно было всегда только одно видео
    if (
      videoElement.paused &&
      !e.target.closest(".media__item-volume") &&
      !e.target.closest(".media__item-progress") &&
      !e.target.closest(".go-over")
    ) {
      clearListener();
      if (block === mediaBlocks.video) {
        fadePlayer(e);
      }
      elements.forEach((el) => {
        // контроллер скроется автоматически через 2.5 сек. от бездействия, при включении следующего видео, предыдущий должен раскрыться, поэтому ужалям класс hidden
        const controlsHidden = el.querySelector(".smooth-hidden");
        if (controlsHidden) controlsHidden.classList.remove("smooth-hidden");

        const num = el.querySelector("video").getAttribute("data-index");
        if (num != index) {
          const btnMute = el.querySelector(".volume-mute");
          const btnLoud = el.querySelector(".volume-loud");
          if (!btnMute.classList.contains("hidden"))
            btnMute.classList.add("hidden");
          if (btnLoud.classList.contains("hidden"))
            btnLoud.classList.remove("hidden");

          const videoElement = el.querySelector("video");
          videoElement.pause();
          // все видео возвращаем к нулевому времени
          videoElement.currentTime = 0;
          // громкость выставляем на максимум и скрываем
          const volume = el.querySelector(".volume");
          volume.value = 1;
          videoElement.volume = 1;
          const volumeBlock = el.querySelector(".media__item-volume");
          volumeBlock.classList.add("hidden");
          // ползунок тоже перемещаем к нулю
          const progress = el.querySelector(".progress");
          progress.value =
            (videoElement.currentTime / videoElement.duration) * 100;
          const goOverBtn = el.querySelector(".go-over");
          goOverBtn.classList.add("hidden");
          const progressBlock = el.querySelector(".media__item-progress");
          progressBlock.classList.add("hidden");
          const playBtn = el.querySelector(".media__item-play");
          playBtn.classList.remove("hidden");
          const pauseBtns = el.querySelector(".media__item-pause");
          pauseBtns.classList.add("hidden");
        }
      });
      // запустим функцию, которая проставит начальные значения в таймер, индекс передаем текущего элемента, чтобы его пропустить
      initTimes(index);
      // включаем текущее видео
      videoElement.play();
      // скрываем кнопку play
      playBtn.classList.add("hidden");
      // показываем кнопку pause
      pauseBtn.classList.remove("hidden");
      // показываем ползунок времени
      progressBlock.classList.remove("hidden");
      // скрываем кнопку "перейти"
      goOverBtn.classList.remove("hidden");
      // показываем ползунок громкости
      volumeBlock.classList.remove("hidden");
    } else if (
      videoElement.play &&
      !e.target.closest(".media__item-volume") &&
      !e.target.closest(".media__item-progress") &&
      !e.target.closest(".go-over")
    ) {
      // если нажали на pause, останавляваем видео
      videoElement.pause();
      // показываем кнопку play
      playBtn.classList.remove("hidden");
      // скрываем кнопку pause
      pauseBtn.classList.add("hidden");
    }
  };

  // обновление таймера
  // обновлять будем только проигрываемый слайд
  const updateProgress = (e) => {
    // текущий слайд
    const element = e.target.closest(".swiper-slide");
    // текущий тег видео
    const videoElement = element.querySelector("video");
    // ползунок (инпут)
    const progress = element.querySelector(".progress");
    // кнопка play
    const playBtn = element.querySelector(".media__item-play");
    // кнопка pause
    const pauseBtn = element.querySelector(".media__item-pause");
    // таймер
    const time = element.querySelector(".media__item-time");
    // текущий индекс элемнта
    const currentIndex = videoElement.getAttribute("data-index");

    // если элемент равен текущему проигрываемому слайду
    if (currentIndex == index) {
      // устанавляваем ползунок
      progress.value = (videoElement.currentTime / videoElement.duration) * 100;

      let minutes = Math.floor(videoElement.currentTime / 60);
      let seconds = Math.floor(videoElement.currentTime % 60);
      if (seconds < 10) {
        seconds = "0" + String(seconds);
      }
      if (videoElement.currentTime === videoElement.duration) {
        playBtn.classList.remove("hidden");
        pauseBtn.classList.add("hidden");
      }
      // записываем время в разметку
      time.innerHTML = `${minutes}:${seconds}`;
    }
  };

  // возможность по клику или перемещению менять положение ползунка
  const setProgress = (e) => {
    e.stopPropagation();
    // текущий элемент
    const element = e.target.closest(".swiper-slide");
    // текущий тег видео
    const videoElement = element.querySelector("video");
    // ползунок (инпут)
    const progress = element.querySelector(".progress");
    videoElement.currentTime = (progress.value * videoElement.duration) / 100;
  };
  const setVolume = (e) => {
    e.stopPropagation();
    // текущий элемент
    const element = e.target.closest(".swiper-slide");
    // текущий тег видео
    const videoElement = element.querySelector("video");
    // ползунок (инпут)
    const progress = element.querySelector(".volume");
    const btnMute = element.querySelector(".volume-mute");
    const btnLoud = element.querySelector(".volume-loud");
    videoElement.volume = progress.value;

    if (videoElement.volume !== 0) {
      btnMute.classList.add("hidden");
      btnLoud.classList.remove("hidden");
    } else {
      btnMute.classList.remove("hidden");
      btnLoud.classList.add("hidden");
    }
  };
  const toggleVolume = (e) => {
    e.stopPropagation();
    // текущий элемент
    const element = e.target.closest(".swiper-slide");
    // текущий тег видео
    const videoElement = element.querySelector("video");
    // ползунок (инпут)
    const progress = element.querySelector(".volume");
    const btnMute = element.querySelector(".volume-mute");
    const btnLoud = element.querySelector(".volume-loud");

    const volume = element.querySelector(".volume");
    if (videoElement.volume !== 0) {
      videoElement.volume = 0;
      volume.value = 0;
      btnMute.classList.remove("hidden");
      btnLoud.classList.add("hidden");
    } else {
      videoElement.volume = 1;
      volume.value = 1;
      btnMute.classList.add("hidden");
      btnLoud.classList.remove("hidden");
    }
  };
  // прослушка на ручное перемещение ползунка громкости
  volumes.forEach((item) => {
    item.addEventListener("input", setVolume);
  });
  // прослушка на ручное перемещение ползунка таймера
  progresses.forEach((item) => {
    item.addEventListener("input", setProgress);
  });
  // прослушка на обновление времени видео
  videos.forEach((item) => {
    item.addEventListener("timeupdate", updateProgress);
  });
  // прослушка на клик по видео (вкл/выкл)
  videosFrames.forEach((item) => {
    item.addEventListener("click", toggleVideoStatus);
  });
  volumesBtns.forEach((item) => {
    item.addEventListener("click", toggleVolume);
  });

  return () => {
    // прослушка на ручное перемещение ползунка громкости
    volumes.forEach((item) => {
      item.removeEventListener("input", setVolume);
    });
    // прослушка на ручное перемещение ползунка таймера
    progresses.forEach((item) => {
      item.removeEventListener("input", setProgress);
    });
    // прослушка на обновление времени видео
    videos.forEach((item) => {
      item.removeEventListener("timeupdate", updateProgress);
    });
    // прослушка на клик по видео (вкл/выкл)
    videosFrames.forEach((item) => {
      item.removeEventListener("click", toggleVideoStatus);
    });
    volumesBtns.forEach((item) => {
      item.removeEventListener("click", toggleVolume);
    });
  };
};
