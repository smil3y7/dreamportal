import { data, currentLayer, filterTip } from './data.js';

const map = document.getElementById("map");
const popup = document.getElementById("popup");

export function render() {
  map.innerHTML = `<div id="popup" class="popup"></div>`;

  // === TRANZITI ===
  data.tranziti.forEach(t => {
    const from = data.lokacije[t.od];
    const to = data.lokacije[t.do];
    if (!from || !to || from.layer !== currentLayer || to.layer !== currentLayer) return;
    if (filterTip && ![from.tip, to.tip].includes(filterTip)) return;

    const dx = to.x - from.x, dy = to.y - from.y;
    const dist = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;

    const line = Object.assign(document.createElement("div"), {
      style: `position:absolute;height:3px;background:#6cf;opacity:0.6;left:${400+from.x}px;top:${300+from.y}px;width:${dist}px;transform:rotate(${angle}deg);transform-origin:0 0;`
    });
    map.appendChild(line);
  });

  // === MEHURČKI ===
  Object.entries(data.lokacije).forEach(([ime, loc]) => {
    if (loc.layer !== currentLayer || (filterTip && loc.tip !== filterTip)) return;

    const size = 40 + loc.size * 12;
    const b = document.createElement("div");
    b.className = "bubble";
    b.style = `border-color:${loc.barva};width:${size}px;height:${size}px;left:${400+loc.x-size/2}px;top:${300+loc.y-size/2}px;`;
    b.innerHTML = loc.icon;
    b.title = `${ime} [${loc.tip}]`;

    // DRAG & DROP – POPRAVLJENO
    let dragging = false;
    let startX, startY;

    b.onmousedown = e => {
      if (e.button !== 0) return; // samo levi klik
      dragging = true;
      startX = e.clientX - loc.x;
      startY = e.clientY - loc.y;
      e.preventDefault();
    };

    const onMouseMove = e => {
      if (!dragging) return;
      loc.x = e.clientX - startX;
      loc.y = e.clientY - startY;
      render();
    };

    const onMouseUp = () => {
      if (dragging) {
        dragging = false;
        window.data.shrani();
      }
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    b.onclick = e => {
      e.stopPropagation();
      popup.innerHTML = `<b>${loc.icon} ${ime}</b><small>Tip: ${loc.tip}</small><hr>${loc.desc.map(d => `<details><summary>Dream</summary>${d}</details>`).join('')}`;
      popup.style.left = (e.pageX + 20) + "px";
      popup.style.top = (e.pageY + 20) + "px";
      popup.style.display = "block";

      // Prepreči drag ob kliku
      if (dragging) return;
      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    };

    map.appendChild(b);
  });
}
