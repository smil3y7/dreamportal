import { data, shrani, izvozi, nalozi } from './data.js';
import { render } from './render.js';
import { analizirajSanje } from './detector.js';

export function initUI() {
  document.getElementById("dodaj-btn").onclick = () => {
    const tekst = document.getElementById("nova-sanja").value.trim();
    if (!tekst) return alert("Vnesi sanje!");
    const id = Date.now();
    data.sanje.push({ id, tekst, datum: new Date().toLocaleString("sl-SI") });
    analizirajSanje(tekst, id, data);
    document.getElementById("nova-sanja").value = "";
    osveziSeznam();
    render();
    shrani();
  };

  document.getElementById("izvozi-btn").onclick = izvozi;
  document.getElementById("save-btn").onclick = () => { shrani(); alert("Shranjeno!"); };
  document.getElementById("github-btn").onclick = () => {
    const blob = new Blob([document.documentElement.outerHTML], {type: "text/html"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "index.html"; a.click();
    alert("index.html za GitHub pripravljen!");
  };

  document.querySelectorAll(".layer-btn").forEach(btn => {
    btn.onclick = () => {
      document.querySelectorAll(".layer-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      window.data.currentLayer = btn.dataset.layer;
      render();
    };
  });

  document.getElementById("filter-tip").onchange = e => {
    window.data.filterTip = e.target.value;
    render();
  };

  map.onclick = () => popup.style.display = "none";
}

export function osveziSeznam() {
  document.getElementById("seznam-sanj").innerHTML = data.sanje.map((s, i) => `
    <div class="sanja"><b>#${i + 1}</b> <small>${s.datum}</small><br>${s.tekst.substring(0,180)}...</div>
  `).join("");
}
