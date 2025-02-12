const d = document;

export default function slider() {
  const $slides = d.querySelectorAll(".slider-slide");
  const $controls = d.querySelectorAll(".controls li");
  const $pauseButton = d.createElement("button");
  let i = 0;
  let startX = 0;
  let currentX = 0;
  let isDragging = false;
  let isPaused = false;
  let sliderInterval;
  
  $pauseButton.textContent = "❚❚";
  $pauseButton.classList.add("pause-btn");
  d.querySelector(".slider").appendChild($pauseButton);
  
  const reloadSlider = () => {
    $slides.forEach((el) => el.classList.remove("active"));
    $slides[i].classList.add("active");
  };

  const reloadControls = () => {
    $controls.forEach((el) => el.classList.remove("active"));
    $controls[i].classList.add("active");
  };

  const goToNext = () => {
    i = (i + 1) % $slides.length;
    reloadSlider();
    reloadControls();
    restartInterval();
  };

  const goToPrev = () => {
    i = (i - 1 + $slides.length) % $slides.length;
    reloadSlider();
    reloadControls();
    restartInterval();
  };

  const startDrag = (e) => {
    isDragging = true;
    startX = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const moveDrag = (e) => {
    if (!isDragging) return;
    currentX = e.touches ? e.touches[0].clientX : e.clientX;
    const difference = currentX - startX;

    if (Math.abs(difference) > 100) {
      isDragging = false;
      if (difference > 0) {
        goToPrev();
      } else {
        goToNext();
      }
    }
  };

  const endDrag = () => {
    isDragging = false;
  };

  const startInterval = () => {
    sliderInterval = setInterval(goToNext, 10000);
  };

  const restartInterval = () => {
    clearInterval(sliderInterval);
    if (!isPaused) startInterval();
  };

  $pauseButton.addEventListener("click", () => {
    isPaused = !isPaused;
    if (isPaused) {
      clearInterval(sliderInterval);
      $pauseButton.textContent = "▶";
    } else {
      startInterval();
      $pauseButton.textContent = "❚❚";
    }
  });

  d.querySelector(".slider-slides").addEventListener("touchstart", startDrag);
  d.querySelector(".slider-slides").addEventListener("touchmove", moveDrag);
  d.querySelector(".slider-slides").addEventListener("touchend", endDrag);
  d.querySelector(".slider-slides").addEventListener("mousedown", startDrag);
  d.addEventListener("mousemove", moveDrag);
  d.addEventListener("mouseup", endDrag);

  d.querySelector(".slider-btns .prev").addEventListener("click", (e) => {
    e.preventDefault();
    goToPrev();
  });

  d.querySelector(".slider-btns .next").addEventListener("click", (e) => {
    e.preventDefault();
    goToNext();
  });

  $controls.forEach((li) => {
    li.addEventListener("click", (e) => {
      i = parseInt(e.target.id, 10);
      reloadSlider();
      reloadControls();
      restartInterval();
    });
  });

  startInterval();
}
