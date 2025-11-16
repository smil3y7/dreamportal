const PREVODI = {
  sl: { appName: "DreamPortal", addButton: "Dodaj sanje", exportButton: "Izvozi JSON", resetView: "Reset", inputPlaceholder: "Tukaj vnesi svoje sanje..." },
  en: { appName: "DreamPortal", addButton: "Add Dream", exportButton: "Export JSON", resetView: "Reset", inputPlaceholder: "Enter your dream here..." }
};

export function changeLanguage(lang) {
  localStorage.setItem("dreamPortalLang", lang);
  document.querySelectorAll("[data-t]").forEach(el => {
    const key = el.dataset.t;
    el.innerText = PREVODI[lang][key] || el.innerText;
  });
  document.getElementById("nova-sanja").placeholder = PREVODI[lang].inputPlaceholder;
}
