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

// Demo
setTimeout(() => {
  document.getElementById("nova-sanja").value = `Sem doma. Prileti žoga. Poberem jo → na igrišču. Grem proti jugu v mesto. Skočim v vodnjak → na morju.`;
  document.getElementById("dodaj-btn").click();
}, 800);
