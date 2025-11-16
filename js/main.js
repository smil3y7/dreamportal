import { nalozi, data } from './data.js';
import { initUI, osveziSeznam } from './ui.js';
import { render } from './render.js';

// Globalno za utils
window.utils = (await import('./utils.js'));
window.data = (await import('./data.js'));

nalozi();
osveziSeznam();
render();
initUI();

// Na koncu main.js
changeLanguage("en"); // privzeto angleško

// Demo sanje v angleščini
setTimeout(() => {
  const demo = currentLang === "sl" 
    ? `Sem doma. Prileti žoga. Poberem jo → na igrišču. Grem proti jugu v mesto.`
    : `I'm home. A ball flies in. I pick it up → on the field. I go south to the city.`;
  document.getElementById("nova-sanja").value = demo;
  document.getElementById("dodaj-btn").click();
}, 800);
