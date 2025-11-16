import { get } from './db.js';

let scale = 1, panX = 0, panY = 0;
let isPanning = false, startX, startY;

export function initZoomAndPan() {
  const map = document.getElementById("map");
  let startScale;

  map.addEventListener("wheel", e => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    scale = Math.max(0.3, Math.min(scale * delta, 5));
    updateZoom(); render();
  });

  const hammer = new Hammer(map);
  hammer.get('pinch').set({ enable: true });
  hammer.on('pinchstart', e => startScale = scale);
  hammer.on('pinch', e => { scale = Math.max(0.3, Math.min(startScale * e.scale, 5)); updateZoom(); render(); });
  hammer.on('panstart', e => { isPanning = true; startX = e.center.x - panX; startY = e.center.y - panY; });
  hammer.on('panmove', e => { if (isPanning) { panX = e.center.x - startX; panY = e.center.y - startY; render(); }});
  hammer.on('panend', () => isPanning = false);

  map.ondblclick = e => { if (e.target === map) { scale *= 1.5; updateZoom(); render(); }};
}

function updateZoom() {
  document.getElementById("zoom-level").innerText = `${Math.round(scale * 100)}%`;
}

export function resetView() {
  scale = 1; panX = 0; panY = 0;
  updateZoom(); render();
}

export async function render() {
  const data = await get("main") || window.data;
  const container = document.getElementById("map");
  container.innerHTML = `<div id="canvas" style="position:relative;transform:translate(${panX}px,${panY}px) scale(${scale});transform-origin:top left;"></div><div id="popup" class="popup"></div>`;
  const canvas = document.getElementById("canvas");

  // Dodaj mehurčke (primer)
  for (const [id, loc] of Object.entries(data.lokacije)) {
    const div = document.createElement("div");
    div.style.position = "absolute";
    div.style.left = `${loc.x - loc.size/2}px`;
    div.style.top = `${loc.y - loc.size/2}px`;
    div.style.width = div.style.height = `${loc.size}px`;
    div.style.background = loc.barva;
    div.style.borderRadius = "50%";
    div.style.display = "flex";
    div.style.alignItems = "center";
    div.style.justifyContent = "center";
    div.style.fontSize = `${loc.size/2}px`;
    div.innerHTML = loc.icon;
    div.onclick = () => showPopup(loc, div.getBoundingClientRect());
    canvas.appendChild(div);
  }
}

function showPopup(loc, rect) {
  const popup = document.getElementById("popup");
  popup.innerHTML = `<strong>${loc.icon} ${loc.tip}</strong><p>${loc.povzetek || "Brez opisa"}</p>`;
  popup.style.display = "block";
  popup.style.left = `${rect.left + window.scrollX}px`;
  popup.style.top = `${rect.bottom + window.scrollY}px`;
}
