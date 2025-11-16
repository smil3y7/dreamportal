export const SMERI = {
  sever: { x: 0, y: 400 },
  jug: { x: 0, y: -400 },
  vzhod: { x: 400, y: 0 },
  zahod: { x: -400, y: 0 },
  jugovzhod: { x: 300, y: -300 },
  neznano: { x: () => (Math.random() - 0.5) * 600, y: () => (Math.random() - 0.5) * 600 }
};

export const TIP_BARVE = {
  dom: "var(--dom)", mesto: "var(--mesto)", gore: "var(--gore)",
  morje: "var(--morje)", spodnji: "var(--spodnji)", abstraktna: "var(--abstraktna)"
};

export const IKONE = {
  dom: "🏠", mesto: "🏙️", gore: "⛰️", morje: "🌊", spodnji: "🕳️", abstraktna: "✨"
};

export function izlociIme(tekst, tip, besede) {
  const kljucne = DETEKTOR[tip];
  const najdena = kljucne.find(k => besede.includes(k));
  return najdena ? najdena.charAt(0).toUpperCase() + najdena.slice(1) : tip.charAt(0).toUpperCase() + tip.slice(1);
}

export function dolociSmer(tekst) {
  const t = tekst.toLowerCase();
  if (t.includes("sever")) return "sever";
  if (t.includes("jug")) return "jug";
  if (t.includes("vzhod")) return "vzhod";
  if (t.includes("zahod")) return "zahod";
  if (t.includes("morje")) return "jugovzhod";
  if (t.includes("gore")) return "sever";
  return "neznano";
}
