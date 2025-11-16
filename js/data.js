export let data = { center: "dom", lokacije: {}, tranziti: [], sanje: [], version: "3.0" };
export let currentLayer = "zgornji";
export let filterTip = "";

export function nalozi() {
  const saved = localStorage.getItem("dreamPortalData_v3");
  if (saved) {
    try {
      data = JSON.parse(saved);
    } catch (e) {
      console.error("Napaka pri branju localStorage", e);
    }
  }
  // init() se kliče v main.js
}

export function shrani() {
  localStorage.setItem("dreamPortalData_v3", JSON.stringify(data));
}

export function izvozi() {
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `dreamportal_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
}
