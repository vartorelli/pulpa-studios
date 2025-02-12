const btnInstaOpen = document.querySelector(".btn-insta"),
  btnInstaClose = document.querySelector(".btn-close"),
  divInsta = document.querySelector(".insta");
export const openModal = () => {
btnInstaOpen.addEventListener('click',e=>{
    divInsta.classList.remove("close");
    })
    btnInstaClose.addEventListener('click',e=>{
        divInsta.classList.add("close");
  })
};
