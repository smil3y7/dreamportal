export const DETEKTOR = {
  dom: ["doma", "hiša", "stanovanje", "kuhinja", "postelja", "soba", "dnevna", "balkon", "TV"],
  mesto: ["mesto", "ulica", "trg", "avtobus", "trgovina", "restavracija", "kavarna", "banka", "pošta"],
  gore: ["gore", "hrib", "planina", "vrh", "gozd", "smreka", "bor", "pot"],
  morje: ["morje", "obala", "otok", "valovi", "ladja", "plavanje", "pesek", "voda"],
  spodnji: ["jama", "tunel", "podzemlje", "labirint", "klet", "kamnita", "temna"],
  abstraktna: ["platforma", "nič", "lebdenje", "svetloba", "tema", "zvezde", "oblačna"]
};

export function analizirajSanje(tekst, sanjaId, data) {
  const besede = tekst.toLowerCase().split(/\s+/);
  let zadnja = "dom";

  Object.entries(DETEKTOR).forEach(([tip, kljucne]) => {
    if (kljucne.some(k => besede.includes(k))) {
      const { izlociIme, dolociSmer } = window.utils;
      const ime = izlociIme(tekst, tip, besede);
      const kljuc = `${ime} (${tip})`;
      const plast = tip === "spodnji" ? "spodnji" : "zgornji";
      const smer = dolociSmer(tekst);

      const pozicija = window.utils.SMERI[smer] || window.utils.SMERI.neznano;
      const x = typeof pozicija.x === "function" ? pozicija.x() : pozicija.x;
      const y = typeof pozicija.y === "function" ? pozicija.y() : pozicija.y;

      if (!data.lokacije[kljuc]) {
        data.lokacije[kljuc] = {
          x, y, layer: plast, icon: window.utils.IKONE[tip], size: 8, tip,
          desc: [`[Sanje #${data.sanje.length}] ${tekst.substring(0,120)}...`],
          barva: window.utils.TIP_BARVE[tip]
        };
      } else {
        data.lokacije[kljuc].desc.push(`[Sanje #${data.sanje.length}] ${tekst.substring(0,120)}...`);
        data.lokacije[kljuc].size += 2;
      }

      if (zadnja !== kljuc) {
        const trigger = izlociTranzit(tekst);
        data.tranziti.push({ od: zadnja, do: kljuc, trigger, sanja: sanjaId });
        zadnja = kljuc;
      }
    }
  });
}

function izlociTranzit(tekst) {
  const t = tekst.toLowerCase();
  if (t.includes("prileti") || t.includes("poberem")) return "žoga → prestavilo me";
  if (t.includes("skočim")) return "skok skozi vodnjak";
  if (t.includes("okno")) return "vstop skozi okno";
  return "prehod";
}
