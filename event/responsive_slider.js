const d = document;
export default function slider() {
  const $nextBtn = d.querySelector(".slider-btns .next"),
    $prevBtn = d.querySelector(".slider-btns .prev"),
    $slides = d.querySelectorAll(".slider-slide"),
    $controls = d.querySelectorAll(".controls li");

  let i = 0;

  const reloadSlider = () => {
    $slides.forEach((el) => {
      el.classList.remove("active");
    });
    $slides[i].classList.add("active");
  };
  const reloadControls = () => {
    $controls.forEach((el) => {
      el.classList.remove("active");
    });
    $controls[i].classList.add("active");
  };

  d.addEventListener("click", (e) => {
    if (e.target === $prevBtn) {
      e.preventDefault();
      i--;

      if (i < 0) {
        i = $slides.length - 1;
      }
      reloadSlider();
      reloadControls();
    }
  });
  d.addEventListener("click", (e) => {
    if (e.target === $nextBtn) {
      e.preventDefault();
      i++;

      if (i >= $slides.length) {
        i = 0;
      }
      reloadSlider();
      reloadControls();
    }
  });

  $controls.forEach((li) => {
    li.addEventListener("click", (e) => {
      console.log($controls);
      i = e.target.id;
      reloadSlider();
      reloadControls();
    });
  });
  
    setInterval(
      function () {
        i++;
        if (i >= $slides.length) {
          i = 0;
        }
        reloadSlider();
        reloadControls();
      },
      [10000]
    );


}
