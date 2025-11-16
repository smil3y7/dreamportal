export let data = { center: "dom", lokacije: {}, tranziti: [], sanje: [], version: "3.0" };
export let currentLayer = "zgornji";
export let filterTip = "";

export function nalozi() {
  const saved = localStorage.getItem("dreamPortalData_v3");
  if (saved) data = JSON.parse(saved);
  else init();
}

function init() {
  data.lokacije["dom"] = { 
    x: 0, y: 0, layer: "zgornji", icon: "🏠", size: 20, tip: "dom", 
    desc: ["Izhodišče"], barva: "var(--dom)"
  };
}

export function shrani() {
  localStorage.setItem("dreamPortalData_v3", JSON.stringify(data));
}

export function izvozi() {
  const blob = new Blob([JSON.stringify(data, null, 2)], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `sanjski_svet_${new Date().toISOString().split('T')[0]}.json`;
  a.click();
}
