export function initUI() {
  document.getElementById("dodaj-btn").onclick = () => {
    const tekst = document.getElementById("nova-sanja").value;
    if (tekst) {
      window.data.sanje.push({ id: Date.now(), tekst, datum: new Date().toISOString().split("T")[0] });
      document.getElementById("nova-sanja").value = "";
      // Tu klič detector in render
    }
  };
}

export function changeLanguage(lang) {
  localStorage.setItem("dreamPortalLang", lang);
  // Prevedi elemente z data-t
}
