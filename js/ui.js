import { data, currentLayer, filterTip } from './data.js';
import { render } from './render.js';

const PREVODI = {
  sl: {
    title: "DreamPortal",
    subtitle: "Vnesi sanje → avtomatsko se posodobi",
    add: "Dodaj sanje",
    export: "Izvozi JSON",
    save: "Shrani",
    github: "GitHub",
    upper: "Zgornji svet",
    lower: "Spodnji svet",
    all: "Vse lokacije",
    dom: "Dom", mesto: "Mesto", gore: "Gore", morje: "Morje", spodnji: "Spodnji svet", abstraktna: "Abstraktna"
  },
  en: {
    title: "DreamPortal",
    subtitle: "Enter dream → auto-update map",
    add: "Add Dream",
    export: "Export JSON",
    save: "Save",
    github: "GitHub",
    upper: "Upper World",
    lower: "Lower World",
    all: "All locations",
    dom: "Home", mesto: "City", gore: "Mountains", morje: "Sea", spodnji: "Underworld", abstraktna: "Abstract"
  }
};

let currentLang = "en";

export function changeLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("dreamPortalLang", lang);

  // Posodobi vse [data-t]
  document.querySelectorAll("[data-t]").forEach(el => {
    const key = el.getAttribute("data-t");
    if (PREVODI[lang][key]) el.innerText = PREVODI[lang][key];
  });

  // Posodobi filter možnosti
  const filter = document.getElementById("filter-tip");
  const tipMap = { dom: "dom", mesto: "mesto", gore: "gore", morje: "morje", spodnji: "spodnji", abstraktna: "abstraktna" };
  Array.from(filter.options).forEach((opt, i) => {
    if (i === 0) opt.text = PREVODI[lang].all;
    else opt.text = PREVODI[lang][tipMap[opt.value]] || opt.text;
  });

  osveziSeznam();
  render();
}

export function initUI() {
  // Jezik iz localStorage
  const savedLang = localStorage.getItem("dreamPortalLang") || "en";
  document.getElementById("lang-select").value = savedLang;
  changeLanguage(savedLang);

  document.getElementById("dodaj-btn").onclick = () => {
    const tekst = document.getElementById("nova-sanja").value.trim();
    if (!tekst) return alert(currentLang === "sl" ? "Vnesi sanje!" : "Enter a dream!");
    const id = Date.now();
    data.sanje.push({ id, tekst, datum: new Date().toLocaleString("sl-SI") });
    window.detector.analizirajSanje(tekst, id, data);
    document.getElementById("nova-sanja").value = "";
    osveziSeznam();
    render();
    window.data.shrani();
  };

  document.getElementById("izvozi-btn").onclick = window.data.izvozi;
  document.getElementById("save-btn").onclick = () => { window.data.shrani(); alert(PREVODI[currentLang].save + "!"); };
  document.getElementById("github-btn").onclick = () => {
    const blob = new Blob([document.documentElement.outerHTML], {type: "text/html"});
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a"); a.href = url; a.download = "index.html"; a.click();
    alert("index.html " + (currentLang === "sl" ? "pripravljen za GitHub!" : "ready for GitHub!"));
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

  document.getElementById("map").onclick = e => {
    if (e.target === document.getElementById("map")) {
      document.getElementById("popup").style.display = "none";
    }
  };
}

export function osveziSeznam() {
  document.getElementById("seznam-sanj").innerHTML = data.sanje.map((s, i) => `
    <div class="sanja"><b>#${i + 1}</b> <small>${s.datum}</small><br>${s.tekst.substring(0,180)}...</div>
  `).join("");
}
