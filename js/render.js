import { getAllLokacije } from './db.js';

let scale = 1, panX = 0, panY = 0;

export function initZoomPan() {
  const map = document.getElementById("map");
  map.addEventListener("wheel", e => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    scale = Math.max(0.3, Math.min(scale * delta, 5));
    updateZoom();
    render();
  });

  const hammer = new Hammer(map);
  hammer.get('pinch').set({ enable: true });
  hammer.on('pinch', e => {
    scale = Math.max(0.3, Math.min(scale * e.scale, 5));
    updateZoom();
    render();
  });
  hammer.on('panmove', e => {
    panX += e.deltaX;
    panY += e.deltaY;
    render();
  });
}

function updateZoom() {
  document.getElementById("zoom-level").innerText = `${Math.round(scale * 100)}%`;
}

export function resetView() {
  scale = 1; panX = 0; panY = 0;
  updateZoom();
  render();
}

export async function render() {
  const lokacije = await getAllLokacije();
  const container = document.getElementById("map");
  container.innerHTML = `<div id="canvas" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) translate(${panX}px,${panY}px) scale(${scale});transform-origin:center center;"></div><div id="popup" class="popup"></div>`;
  const canvas = document.getElementById("canvas");

  lokacije.forEach(loc => {
    const div = document.createElement("div");
    div.className = `sfera ${loc.arhetip ? 'arhetip' : ''}`;
    div.style.left = `${loc.x - loc.size/2}px`;
    div.style.top = `${loc.y - loc.size/2}px`;
    div.style.width = div.style.height = `${loc.size}px`;
    div.style.background = loc.barva;
    div.innerHTML = loc.icon;

    div.onclick = (e) => {
      e.stopPropagation();
      const popup = document.getElementById("popup");
      popup.innerHTML = `<strong>${loc.icon} ${loc.tip}</strong><p>${loc.povzetek}</p><hr>${loc.opis.map(o => `<small>${o.datum}: ${o.tekst}</small><br>`).join("")}`;
      popup.style.display = "block";
      popup.style.left = `${e.pageX + 10}px`;
      popup.style.top = `${e.pageY + 10}px`;
    };

    canvas.appendChild(div);
  });
}

document.getElementById("map").onclick = () => document.getElementById("popup").style.display = "none";
