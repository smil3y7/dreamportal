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
    filter: "Filter: "
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
    filter: "Filter: "
  }
};

let currentLang = "en";

export function changeLanguage(lang) {
  currentLang = lang;
  document.querySelectorAll("[data-t]").forEach(el => {
    const key = el.getAttribute("data-t");
    el.innerText = PREVODI[lang][key] || el.innerText;
  });
  // Posodobi filter placeholder
  const filter = document.getElementById("filter-tip");
  filter.options[0].text = lang === "sl" ? "Vse lokacije" : "All locations";
  osveziSeznam();
  render();
}

// Posodobi osveziSeznam
export function osveziSeznam() {
  document.getElementById("seznam-sanj").innerHTML = data.sanje.map((s, i) => `
    <div class="sanja"><b>#${i + 1}</b> <small>${s.datum}</small><br>${s.tekst.substring(0,180)}...</div>
  `).join("");
}
