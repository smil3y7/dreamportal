import { data, currentLayer, filterTip } from './data.js';
import { SMERI, TIP_BARVE } from './utils.js';

const map = document.getElementById("map");
const popup = document.getElementById("popup");

export function render() {
  map.innerHTML = `<div id="popup" class="popup"></div>`;

  // Tranziti
  data.tranziti.forEach(t => {
    const from = data.lokacije[t.od];
    const to = data.lokacije[t.do];
    if (!from || !to || from.layer !== currentLayer || filterTip && from.tip !== filterTip) return;

    const line = document.createElement("div");
    line.style = `position:absolute;height:3px;background:#6cf;opacity:0.6;left:${400+from.x}px;top:${300+from.y}px;width:${Math.hypot(to.x-from.x, to.y-from.y)}px;transform:rotate(${Math.atan2(to.y-from.y, to.x-from.x)*180/Math.PI}deg);transform-origin:0 0;`;
    map.appendChild(line);
  });

  // Mehurčki
  Object.entries(data.lokacije).forEach(([ime, loc]) => {
    if (loc.layer !== currentLayer || (filterTip && loc.tip !== filterTip)) return;
    const size = 40 + loc.size * 12;
    const b = document.createElement("div");
    b.className = "bubble";
    b.style = `border-color:${loc.barva};width:${size}px;height:${size}px;left:${400+loc.x-size/2}px;top:${300+loc.y-size/2}px;`;
    b.innerHTML = loc.icon;
    b.title = `${ime} [${loc.tip}]`;

    // Drag & drop
    let dragging = false;
    b.onmousedown = e => { dragging = true; e.stopPropagation(); };
    document.onmousemove = e => {
      if (dragging) { loc.x = e.clientX - 400; loc.y = e.clientY - 300; render(); }
    };
    document.onmouseup = () => { dragging = false; window.data.shrani(); };

    // Popup
    b.onclick = e => {
      e.stopPropagation();
      popup.innerHTML = `<b>${loc.icon} ${ime}</b><small>Tip: ${loc.tip}</small><hr>${loc.desc.map(d=>`<details><summary>Sanja</summary>${d}</details>`).join('')}`;
      popup.style.left = (e.pageX + 20) + "px";
      popup.style.top = (e.pageY + 20) + "px";
      popup.style.display = "block";
    };

    map.appendChild(b);
  });
}
