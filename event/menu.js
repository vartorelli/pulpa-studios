const d = document;

const btnNavOpen = d.querySelector('.nav-btn-open')
const btnNavClose = d.querySelector('.nav-btn-close')
const nav = d.querySelector('.navegador-close')

export const menu = () => {
    d.addEventListener("click",e=>{
        if(e.target === btnNavOpen){
            nav.className = "navegador"
            btnNavOpen.toggleAttribute('hidden')
        }else if(e.target === btnNavClose){
            nav.className = "navegador-close"
            btnNavOpen.toggleAttribute('hidden')
        }
    })
}