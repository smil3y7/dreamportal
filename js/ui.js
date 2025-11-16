const PREVODI = {
  sl: { appName: "DreamPortal", addButton: "Dodaj", resetView: "Resetiraj", inputPlaceholder: "Tukaj vnesi svoje sanje..." },
  en: { appName: "DreamPortal", addButton: "Add", resetView: "Reset", inputPlaceholder: "Enter your dream..." }
};

export function changeLanguage(lang) {
  localStorage.setItem("lang", lang);
  document.querySelectorAll("[data-t]").forEach(el => {
    const key = el.dataset.t;
    if (PREVODI[lang][key]) el.innerText = PREVODI[lang][key];
  });
  document.getElementById("nova-sanja").placeholder = PREVODI[lang].inputPlaceholder;
}
