import contactFormValidation from "./event/form_validacion.js";
import { menu } from "./event/menu.js";
import slider from "./event/responsive_slider.js";

const d = document;


d.addEventListener("DOMContentLoaded",e=>{
    menu();
    slider();
    contactFormValidation();
})

