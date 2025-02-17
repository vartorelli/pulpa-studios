const d = document;

export default function contactFormValidation() {
  const $form = d.querySelector(".contact-form"),
    $inputs = d.querySelectorAll(".contact-form [required]");
  $inputs.forEach((input) => {
    const $span = d.createElement("span");
    $span.id = input.name;
    $span.textContent = input.title;
    $span.classList.add("contact-form-error", "none");
    input.insertAdjacentElement("afterend", $span);
  });
  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".contact-form [required]")) {
      let $input = e.target,
        pattern = $input.pattern || $input.dataset.pattern;
      //console.log($input, pattern)
      if (pattern && $input.value !== "") {
        let regex = new RegExp(pattern);
        console.log(pattern);
        return !regex.exec($input.value)
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }
      if (!pattern) {
        return $input.value === ""
          ? d.getElementById($input.name).classList.add("is-active")
          : d.getElementById($input.name).classList.remove("is-active");
      }
    }
  });
  $form.addEventListener("submit", (event) => {
    const $overlay = document.querySelector(".modal-overlay"),
      $loader = d.querySelector(".contact-form-loader"),
      $response = d.querySelector(".contact-form-response"),
      $btnSubmit = d.querySelector(".input-submit");
    event.preventDefault();

    $loader.classList.add("modal-visible");
    $overlay.classList.add("modal-visible");

    setTimeout(() => {
      $loader.classList.remove("modal-visible");
      $response.classList.add("modal-visible");
      $form.reset();
    }, 3000);

    setTimeout(() => {
      $response.classList.remove("modal-visible");
      $overlay.classList.remove("modal-visible");
    }, 5000);
  });
  $inputs.forEach((input, index) => {
    input.addEventListener("change", () => moveToNextInput(index));

    input.addEventListener("input", (e) => {
      if (e.target.matches(":-webkit-autofill")) {
        moveToNextInput(index);
      }
    });

    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        e.preventDefault();
        moveToNextInput(index);
      }
    });
  });

  function moveToNextInput(index) {
    const nextInput = $inputs[index + 1];
    if (nextInput) {
      nextInput.focus();
    }
  }
}
