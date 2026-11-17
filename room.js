// The room behind everything: cats you can poke, string lights, snow, a toy mouse,
// plus the screen wipe, the "cats are deciding" moment and the hearts at the end.
const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
const room = document.getElementById("room");
const el = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content.firstChild; };

// where each cat sits, in room pixels (the room is 320 x 180)
const SPOTS = { clara: [72, 75], belka: [170, 33], bian: [274, 41], sam: [258, 83], anatoliy: [289, 129], bari: [36, 137], zasranka: [203, 115], felix: [238, 152], clever: [70, 154], kinder: [142, 140] };
const BULBS = ["#ffd76a", "#ff9f8a", "#ffe9a8", "#9fe0c0"];
const cats = {};

export function initRoom(CATS, nameOf) {
  // string lights along a sagging wire
  let wire = "", bulbs = "";
  for (let x = 6, i = 0; x < 320; x += 13, i++) { const t = x / 320, y = 3 + 28 * t * (1 - t); bulbs += `<i class="bulb" style="--x:${x};--y:${Math.round(y)};--c:${BULBS[i % 4]};animation-delay:${-(i * 0.37) % 2.4}s"></i>`; }
  for (let x = 0; x <= 320; x += 4) { const t = x / 320; wire += `${x},${(3 + 28 * t * (1 - t)).toFixed(1)} `; }
  room.append(el(`<svg class="wire" viewBox="0 0 320 180" preserveAspectRatio="none" aria-hidden="true"><polyline points="${wire}" fill="none" stroke="#1a1016" stroke-width="1" shape-rendering="crispEdges"/></svg>`));
  room.insertAdjacentHTML("beforeend", bulbs);
  // the window: snow at night, a bird by day
  const win = el(`<div class="pane" aria-hidden="true"><b class="bird"></b></div>`);
  for (let i = 0; i < 16; i++) win.append(el(`<i class="flake" style="--x:${(i * 37) % 88};animation-duration:${4 + (i % 5)}s;animation-delay:${-(i * 0.9)}s"></i>`));
  room.append(win, el(`<b class="mouse" aria-hidden="true"></b>`));
  for (const c of CATS) {
    const [x, y] = SPOTS[c.id];
    const b = el(`<button class="cat" style="--x:${x};--y:${y}" data-cat="${c.id}"><img src="img/cat_${c.id}.png" alt=""><img class="shut" src="img/catb_${c.id}.png" alt="" style="animation-delay:${-(x % 7)}s;animation-duration:${4 + (y % 4)}s"><span class="say"></span></button>`);
    b.onclick = () => poke(c.id, nameOf(c));
    b.setAttribute("aria-label", nameOf(c));
    cats[c.id] = b; room.append(b);
  }
  // the room leans a little away from the pointer
  if (!still && matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let raf = 0;
    addEventListener("pointermove", (e) => { if (raf) return; raf = requestAnimationFrame(() => { raf = 0;
      room.style.transform = `translate(calc(-50% + ${((0.5 - e.clientX / innerWidth) * 14).toFixed(1)}px), calc(-50% + ${((0.5 - e.clientY / innerHeight) * 8).toFixed(1)}px)) scale(1.03)`; }); });
  }
}

export function poke(id, text, ms = 1600) {
  const b = cats[id]; if (!b) return;
  const say = b.querySelector(".say"); say.textContent = text; b.classList.add("on");
  if (!still) { b.animate([{ transform: "translateY(0)" }, { transform: "translateY(-28%)" }, { transform: "translateY(0)" }], { duration: 260, easing: "cubic-bezier(0.23, 1, 0.32, 1)" });
    const h = el(`<img class="heart" src="img/heart.png" alt="">`); b.append(h);
    h.animate([{ transform: "translate(-50%, 0)", opacity: 1 }, { transform: "translate(-50%, -160%)", opacity: 0 }], { duration: 900, easing: "cubic-bezier(0.23, 1, 0.32, 1)" }).onfinish = () => h.remove(); }
  clearTimeout(b._t); b._t = setTimeout(() => b.classList.remove("on"), ms);
}
export function setAsker(id) { for (const k in cats) { const b = cats[k]; clearTimeout(b._t); b.classList.remove("on"); b.classList.toggle("asking", k === id); if (k === id) b.querySelector(".say").textContent = "?"; } }
export function relabel(CATS, nameOf) { for (const c of CATS) cats[c.id]?.setAttribute("aria-label", nameOf(c)); }

// ---------- screen wipe: chunky squares cover the screen, the page changes, they clear ----------
const fx = document.getElementById("fx"), g = fx.getContext("2d");
let wiping = false;
export function wipe(change) {
  if (still || wiping) return change();
  wiping = true;
  const cols = 24, rows = Math.ceil(cols * innerHeight / innerWidth), n = cols * rows; fx.width = cols; fx.height = rows;
  // squares arrive in diagonal bands with a little scatter
  const order = [...Array(n).keys()].sort((a, b) => (a % cols + (a / cols | 0)) + ((a * 7919) % 5) - ((b % cols + (b / cols | 0)) + ((b * 7919) % 5)));
  const col = getComputedStyle(document.body).getPropertyValue("--edge").trim() || "#3a2028", half = 230, t0 = performance.now();
  let swapped = false;
  const frame = (now) => {
    const t = now - t0, k = Math.min(1, (t < half ? t : t - half) / half), upto = Math.round(k * n);
    g.clearRect(0, 0, cols, rows); g.fillStyle = col;
    if (t < half) for (let i = 0; i < upto; i++) g.fillRect(order[i] % cols, order[i] / cols | 0, 1, 1);
    else { if (!swapped) { swapped = true; change(); } for (let i = upto; i < n; i++) g.fillRect(order[i] % cols, order[i] / cols | 0, 1, 1); }
    if (t < half * 2) requestAnimationFrame(frame); else { g.clearRect(0, 0, cols, rows); wiping = false; }
  };
  requestAnimationFrame(frame);
}

// ---------- the cats talk it over: the light jumps from face to face and slows down on the match ----------
export function deliberate(CATS, winnerId, label) {
  if (still) return Promise.resolve();
  return new Promise((done) => {
    const box = el(`<div class="jury" role="status"><p>${label}</p><div>${CATS.map((c) => `<img src="img/cat_${c.id}.png" data-id="${c.id}" alt="">`).join("")}</div></div>`);
    document.body.append(box);
    const faces = [...box.querySelectorAll("img")], win = CATS.findIndex((c) => c.id === winnerId), total = CATS.length * 2 + win;
    let i = 0;
    const step = () => {
      faces.forEach((f, j) => f.classList.toggle("lit", j === i % faces.length));
      if (i === total) { faces[win].classList.add("won"); return setTimeout(() => { box.remove(); done(); }, 650); }
      i++; setTimeout(step, 55 + Math.pow(i / total, 3) * 260);
    };
    step();
  });
}

// ---------- pixel hearts and paws fall once when the match appears ----------
export function confetti() {
  if (still) return;
  const cv = el(`<canvas class="rain" aria-hidden="true"></canvas>`); document.body.append(cv);
  const W = (cv.width = Math.ceil(innerWidth / 4)), H = (cv.height = Math.ceil(innerHeight / 4)), c = cv.getContext("2d");
  const imgs = ["paw", "paw2", "paw3"].map((n) => Object.assign(new Image(), { src: `img/${n}.png` }));
  const bits = Array.from({ length: 46 }, (_, i) => ({ x: (i * 53) % W, y: -10 - ((i * 31) % 90), v: 0.9 + ((i * 17) % 10) / 9, s: (i * 13) % 20, k: i % 3 }));
  const t0 = performance.now();
  const frame = (now) => { const t = now - t0; c.clearRect(0, 0, W, H); c.globalAlpha = Math.min(1, (2600 - t) / 500);
    for (const b of bits) { b.y += b.v; c.drawImage(imgs[b.k], Math.round(b.x + Math.sin((t / 260) + b.s) * 3), Math.round(b.y)); }
    if (t < 2600) requestAnimationFrame(frame); else cv.remove(); };
  requestAnimationFrame(frame);
}
