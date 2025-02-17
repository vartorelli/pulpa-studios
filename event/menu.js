const d = document;

const btnNavOpen = d.querySelector(".nav-btn-open"),
  btnNavClose = d.querySelector(".nav-btn-close"),
  nav = d.querySelector(".navegador-close"),
  btnsNav = d.querySelectorAll(".btn-nav");

export const menu = () => {
  d.addEventListener("click", (e) => {
    if (nav.className === "navegador show") {
        console.log(e.target)
      if (e.target !== nav) {
        nav.className = "navegador-close";
        nav.classList.toggle("show");
      }
      btnsNav.forEach((btn) => {
        if (e.target === btn) {
          nav.className = "navegador-close";
          nav.classList.toggle("show");
        }
      });
    }
    if (e.target === btnNavOpen) {
      nav.className = "navegador";
      nav.classList.toggle("show");
    } else if (e.target === btnNavClose) {
      nav.className = "navegador-close";
      nav.classList.toggle("show");
    }
  });
};
