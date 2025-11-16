import { nalozi, data, shrani, izvozi } from './data.js';
import { initUI, changeLanguage, osveziSeznam } from './ui.js';
import { render } from './render.js';
import * as utils from './utils.js';
import * as detector from './detector.js';

// Globalno za druge module
window.utils = utils;
window.detector = detector;
window.data = { nalozi, data, shrani, izvozi };
window.render = render;

// Naloži podatke + inicializiraj dom
nalozi();
if (!data.lokacije["dom"]) {
  // Če ni doma, ga ustvari
  data.lokacije["dom"] = { 
    x: 0, y: 0, layer: "zgornji", icon: "🏠", size: 20, tip: "dom", 
    desc: ["Izhodišče"], barva: "var(--dom)"
  };
  shrani();
}

osveziSeznam();
render();
initUI();

// Jezik
const savedLang = localStorage.getItem("dreamPortalLang") || "en";
document.getElementById("lang-select").value = savedLang;
changeLanguage(savedLang);

// Demo
setTimeout(() => {
  const demo = savedLang === "sl" 
    ? `Sem doma. Prileti žoga. Poberem jo → na igrišču. Grem proti jugu v mesto.`
    : `I'm home. A ball flies in. I pick it up → on the field. I go south to the city.`;
  document.getElementById("nova-sanja").value = demo;
  document.getElementById("dodaj-btn").click();
}, 800);
