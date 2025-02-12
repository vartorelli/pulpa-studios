export const sideBar = () => {
  const sidebarLinks = document.querySelectorAll(".side-bar a");

  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function () {
      sidebarLinks.forEach((link) => link.classList.remove("active"));
      
      const proyectActive = document.querySelector(".proyect.active");
      proyectActive.classList.remove("active");
      this.classList.add("active");
      const proyects = document.querySelectorAll(".proyect");
      proyects.forEach((proyect) => {
        if (proyect.id === link.id) {
          proyect.classList.add("active");
        }
      });
      console.log(this);
    });
  });
};
