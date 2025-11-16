import { dodajLokacijo, getLokacija, dodajSanjeSanje } from './db.js';

const IKONE = { dom: "🏠", mesto: "🏙️", morje: "🌊", neznano: "❓" };
const BARVE = { dom: "#ffcc00", mesto: "#6666ff", morje: "#1E90FF", neznano: "#888" };

export async function dodajSanje(tekst) {
  const tip = prepoznajTip(tekst);
  const kljuc = `${tip} (${tip})`;

  const obstojeca = await getLokacija(kljuc);
  const sanja = { tekst, datum: new Date().toLocaleDateString(), tip };

  if (obstojeca) {
    obstojeca.opis.push(sanja);
    obstojeca.size += 3;
    obstojeca.povzetek = generirajPovzetek(obstojeca.opis);
    await dodajLokacijo(obstojeca);
  } else {
    const x = tip === "dom" ? 0 : (Math.random() - 0.5) * 1000;
    const y = tip === "dom" ? 0 : (Math.random() - 0.5) * 1000;
    const nova = {
      kljuc, x, y, size: 25, tip,
      icon: IKONE[tip], barva: BARVE[tip],
      povzetek: tekst.substring(0, 40) + "...",
      opis: [sanja],
      arhetip: ["dom", "mesto", "morje"].includes(tip)
    };
    await dodajLokacijo(nova);
  }

  await dodajSanjeSanje(sanja);
}

function prepoznajTip(tekst) {
  const t = tekst.toLowerCase();
  if (t.includes("dom") || t.includes("hiša")) return "dom";
  if (t.includes("mesto") || t.includes("ulica")) return "mesto";
  if (t.includes("morje") || t.includes("voda")) return "morje";
  return "neznano";
}

function generirajPovzetek(opisi) {
  const besede = opisi.flatMap(o => o.tekst.split(" "));
  return besede.slice(0, 15).join(" ") + "...";
}
