import { initDB } from './db.js';
import { dodajSanje } from './data.js';
import { render, initZoomPan, resetView } from './render.js';
import { changeLanguage } from './ui.js';

async function init() {
  await initDB();
  render();
  initZoomPan();

  document.getElementById("dodaj-btn").onclick = async () => {
    const tekst = document.getElementById("nova-sanja").value.trim();
    if (tekst) {
      await dodajSanje(tekst);
      document.getElementById("nova-sanja").value = "";
      render(); // <-- TUKAJ!
    }
  };

  document.getElementById("test-1000").onclick = async () => {
    for (let i = 0; i < 1000; i++) {
      await dodajSanje(`Sanja #${i}: dom z ${i} sobami`);
    }
    render();
  };

  document.getElementById("lang-select").onchange = (e) => changeLanguage(e.target.value);
  document.getElementById("reset-view").onclick = resetView;
  document.getElementById("fab").onclick = () => document.getElementById("nova-sanja").focus();

  changeLanguage(localStorage.getItem("lang") || "sl");
}

init();
