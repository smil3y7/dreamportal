import { initDB, get, set } from './db.js';
import { render, initZoomAndPan, resetView } from './render.js';
import { initUI, changeLanguage } from './ui.js';

window.data = { lokacije: {}, sanje: [], tranziti: [] };

async function init() {
  await initDB();
  const saved = await get("main");
  if (saved) window.data = saved;

  if (!window.data.lokacije["dom (dom)"]) {
    window.data.lokacije["dom (dom)"] = {
      x: 0, y: 0, layer: "zgornji", icon: "🏠", size: 20, tip: "dom",
      povzetek: "Izhodišče", opis: [], barva: "var(--dom)", arhetip: true
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
}

init();
