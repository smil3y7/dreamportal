import { set } from './db.js';

const SMERI = {
  sever: { x: 0, y: 400 },
  jug: { x: 0, y: -400 },
  vzhod: { x: 400, y: 0 },
  zahod: { x: -400, y: 0 },
  neznano: { x: () => (Math.random() - 0.5) * 800, y: () => (Math.random() - 0.5) * 800 }
};

export function dodajSanje(tekst) {
  const sanja = { id: Date.now(), tekst, datum: new Date().toISOString().split("T")[0] };
  window.data.sanje.push(sanja);

  // Prepoznaj lokacijo (poenostavljeno)
  const tip = prepoznajTip(tekst);
  const ime = tip === "dom" ? "dom" : tip;
  const kljuc = `${ime} (${tip})`;

  if (window.data.lokacije[kljuc]) {
    // OBSTOJEČA – dopolni
    window.data.lokacije[kljuc].opis.push(sanja);
    window.data.lokacije[kljuc].size += 3;
  } else {
    // NOVA – ustvari
    const smer = tip === "dom" ? { x: 0, y: 0 } : SMERI.neznano;
    window.data.lokacije[kljuc] = {
      x: smer.x, y: smer.y,
      layer: "zgornji",
      icon: getIcon(tip),
      size: 20,
      tip,
      povzetek: tekst.substring(0, 50) + "...",
      opis: [sanj],
      barva: `var(--${tip})`,
      arhetip: ["dom", "mesto", "morje"].includes(tip)
    };
  }

  set("main", window.data);
}

function prepoznajTip(tekst) {
  const lower = tekst.toLowerCase();
  if (lower.includes("dom") || lower.includes("hiša")) return "dom";
  if (lower.includes("mesto") || lower.includes("ulica")) return "mesto";
  if (lower.includes("morje") || lower.includes("voda")) return "morje";
  return "neznano";
}

function getIcon(tip) {
  const icons = { dom: "🏠", mesto: "🏙️", morje: "🌊", neznano: "❓" };
  return icons[tip] || "❓";
}
