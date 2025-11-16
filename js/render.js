import { get } from './db.js';

let scale = 1, panX = 0, panY = 0;

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
  hammer.on('panmove', e => { panX += e.deltaX; panY += e.deltaY; render(); });

  map.ondblclick = () => { scale *= 1.5; updateZoom(); render(); };
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
  container.innerHTML = `<div id="canvas" style="position:relative;transform:translate(${panX}px,${panY}px) scale(${scale});transform-origin:center;"></div><div id="popup" class="popup"></div>`;
  const canvas = document.getElementById("canvas");

  for (const [id, loc] of Object.entries(data.lokacije)) {
    const div = document.createElement("div");
    div.className = `mehurcek ${loc.arhetip ? 'arhetip' : ''}`;
    div.style.left = `${loc.x - loc.size/2}px`;
    div.style.top = `${loc.y - loc.size/2}px`;
    div.style.width = div.style.height = `${loc.size}px`;
    div.style.background = loc.barva;
    div.innerHTML = loc.icon;

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

document.getElementById("map").onclick = () => {
  document.getElementById("popup").style.display = "none";
};
