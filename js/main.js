import { initDB, get, set } from './db.js';
import { render, initZoomAndPan, resetView } from './render.js';
import { initUI, changeLanguage } from './ui.js';
import { dodajSanje } from './data.js';

window.data = { lokacije: {}, sanje: [], tranziti: [] };

async function init() {
  await initDB();
  const saved = await get("main");
  if (saved) window.data = saved;

  // DOM V CENTRU – VEDNO
  if (!window.data.lokacije["dom (dom)"]) {
    window.data.lokacije["dom (dom)"] = {
      x: 0, y: 0, layer: "zgornji", icon: "🏠", size: 25, tip: "dom",
      povzetek: "Izhodišče vseh sanj.", opis: [], barva: "var(--dom)", arhetip: true
    };
    await set("main", window.data);
  }

  render();
  initZoomAndPan();
  initUI();

  const lang = localStorage.getItem("dreamPortalLang") || "sl";
  document.getElementById("lang-select").value = lang;
  changeLanguage(lang);

  document.getElementById("reset-view").onclick = resetView;
  document.getElementById("fab").onclick = () => document.getElementById("nova-sanja").focus();
  document.getElementById("toggle-sidebar").onclick = () => {
    document.getElementById("sidebar").classList.toggle("collapsed");
  };

  // DODAJ SANJE
  document.getElementById("dodaj-btn").onclick = () => {
    const tekst = document.getElementById("nova-sanja").value.trim();
    if (tekst) {
      dodajSanje(tekst);
      document.getElementById("nova-sanja").value = "";
      render();
    }
  };
}

init();
