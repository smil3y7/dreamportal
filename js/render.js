import { get } from './db.js';

let scale = 1, panX = 0, panY = 0;

export function initZoomAndPan() { /* ... enako kot prej ... */ }

export function resetView() {
  scale = 1; panX = 0; panY = 0;
  document.getElementById("zoom-level").innerText = "100%";
  render();
}

export async function render() {
  const data = await get("main") || window.data;
  const container = document.getElementById("map");
  container.innerHTML = `<div id="canvas" style="position:relative;transform:translate(${panX}px,${panY}px) scale(${scale});transform-origin:top left;"></div><div id="popup" class="popup"></div>`;
  const canvas = document.getElementById("canvas");

  for (const [id, loc] of Object.entries(data.lokacije)) {
    const div = document.createElement("div");
    div.className = "mehurcek";
    div.style.left = `${loc.x - loc.size/2}px`;
    div.style.top = `${loc.y - loc.size/2}px`;
    div.style.width = div.style.height = `${loc.size}px`;
    div.style.background = loc.barva;
    div.innerHTML = loc.icon;

    // Klik → popup
    div.onclick = (e) => {
      e.stopPropagation();
      const popup = document.getElementById("popup");
      popup.innerHTML = `
        <strong>${loc.icon} ${loc.tip}</strong>
        <p><em>${loc.povzetek}</em></p>
        <hr>
        ${loc.opis.map(o => `<small>${o.datum}: ${o.tekst}</small><br>`).join("")}
      `;
      popup.style.display = "block";
      popup.style.left = `${e.pageX + 10}px`;
      popup.style.top = `${e.pageY + 10}px`;
    };

    canvas.appendChild(div);
  }
}

// Skrij popup ob kliku drugje
document.getElementById("map").onclick = (e) => {
  if (e.target.id === "map") document.getElementById("popup").style.display = "none";
};
