import { SHELTER, CATS, QUESTIONS, PAIRS, LABEL } from "./data.js";
import { profile, rank, simulate, learn, DEFAULT_IMPORTANCE } from "./engine.js";
import { initRoom, poke, setAsker, relabel, wipe, deliberate, confetti } from "./room.js";

const view = document.getElementById("view");
const load = (k, d) => { try { return JSON.parse(localStorage.getItem("pm:" + k)) ?? d; } catch { return d; } };
const save = (k, v) => { try { localStorage.setItem("pm:" + k, JSON.stringify(v)); } catch {} };
const h = (html) => { const t = document.createElement("template"); t.innerHTML = html.trim(); return t.content; };
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const pct = (x) => Math.round(x * 100);

let lang = load("lang", (navigator.language || "").startsWith("ru") ? "ru" : "en");
let theme = load("theme", matchMedia("(prefers-color-scheme: dark)").matches ? "night" : "day");
let importance = load("importance2", DEFAULT_IMPORTANCE), answers = [], at = 0, sim = null, current = "home";
const getSim = () => (sim ??= simulate(QUESTIONS, CATS, importance));
const L = (o) => o[lang];

const T = {
  en: {
    navCats: "The cats", navHow: "How it works", day: "Day", night: "Night",
    tag: "Ten cats live in this room. One of them is a lot like you.", start: "Take the test", meet: "Meet the cats",
    from: (s, c) => `Shelter "${s}", ${c}`, asks: (n) => `${n} asks`, back: "Back",
    yours: "Your match", feel: "Does this feel right?", yes: "Yes", no: "Not really", thanks: "Thanks. The matching on this device just shifted a little.",
    insta: (n) => `Ask about ${n} on Instagram`, again: "Start over", how: "How the matching works",
    youAnd: (n) => `You and ${n}`, radar: (n) => `The darker shape is you, the lighter one is ${n}.`, byTrait: "Trait by trait", also: "Also worth meeting",
    note: "The cat profiles are my first read from one visit to the shelter, so treat the match as an introduction.",
    catsLead: (s, c) => `All ten live at "${s}" in ${c} and are looking for a home.`,
    howH: "How it works",
    howBody: [
      ["Eight traits", "Every answer tells me something about one, two or three traits: play, closeness, chatter, nerve, time alone, a busy home, patience and brushing. None of the questions mention cats on purpose. People answer more honestly about a stuck lift than about themselves."],
      ["Two kinds of fit", "Play, closeness, chatter and nerve are compared directly. The closer you and the cat are, the better.", "The other four only work one way. If you're away a lot, the cat has to be fine alone, and a more independent cat is no worse. If a coat needs brushing, you have to be someone who keeps things up. The score only drops when one side can't cover the other.", "A trait you gave me little to go on counts for less."],
      ["Why it isn't always the same cat", "A cat who sits in the middle on everything would win nearly every time. So the cats who come up least get up to 3 extra points. It is never enough to put a poor fit first."],
    ],
    jury: "The cats are talking it over",
    devH: "On this device", devP: "Each finished test is counted here, on your device only.", done: (n) => `Tests finished here: ${n}.`, none: "No tests finished here yet.",
    wP: "When you say a match feels right or not, the weight of each trait shifts a little. Current weights:", reset: "Reset what this device learned",
    credit: "Font: Monocraft.",
  },
  ru: {
    navCats: "Коты", navHow: "Как это работает", day: "День", night: "Ночь",
    tag: "В этой комнате живут десять котов. Один из них очень похож на тебя.", start: "Пройти тест", meet: "Познакомиться",
    from: (s, c) => `Приют «${s}», ${c}`, asks: (n) => `Спрашивает ${n}`, back: "Назад",
    yours: "Твоя пара", feel: "Похоже на правду?", yes: "Да", no: "Не очень", thanks: "Спасибо. Подбор на этом устройстве немного изменился.",
    insta: (n) => `Спросить в Instagram: ${n}`, again: "Заново", how: "Как работает подбор",
    youAnd: (n) => `Ты и ${n}`, radar: (n) => `Тёмная фигура это ты, светлая: ${n}.`, byTrait: "По чертам", also: "Ещё стоит познакомиться",
    note: "Характеры котов я записала после одного визита в приют, так что считай результат поводом познакомиться.",
    catsLead: (s, c) => `Все десять живут в приюте «${s}» (${c}) и ищут дом.`,
    howH: "Как это работает",
    howBody: [
      ["Восемь черт", "Каждый ответ говорит мне что-то об одной, двух или трёх чертах: игра, близость, болтовня, смелость, одиночество, шумный дом, терпение и уход. В вопросах нарочно нет ни слова о котах. Про застрявший лифт люди отвечают честнее, чем про самих себя."],
      ["Два вида совпадения", "Игра, близость, болтовня и смелость сравниваются напрямую. Чем вы ближе, тем лучше.", "Остальные четыре работают только в одну сторону. Если тебя часто нет дома, кот должен спокойно оставаться один, и более самостоятельный кот ничем не хуже. Если шерсть нужно вычёсывать, важно, чтобы тебе такое было не в тягость. Балл падает только тогда, когда одна сторона не покрывает другую.", "Черта, о которой мало ответов, весит меньше."],
      ["Почему не выпадает один и тот же кот", "Кот со средними значениями по всем чертам побеждал бы почти всегда. Поэтому тем, кто выпадает реже всех, добавляется до 3 баллов. Этого никогда не хватит, чтобы плохое совпадение стало первым."],
    ],
    jury: "Коты совещаются",
    devH: "На этом устройстве", devP: "Каждый пройденный тест считается здесь, только на твоём устройстве.", done: (n) => `Пройдено тестов: ${n}.`, none: "Здесь тест ещё никто не прошёл.",
    wP: "Когда ты отмечаешь, подошёл результат или нет, веса черт немного сдвигаются. Сейчас они такие:", reset: "Сбросить то, чему научилось устройство",
    credit: "Шрифт: Monocraft.",
  },
};
const t = (k, ...a) => { const v = T[lang][k]; return typeof v === "function" ? v(...a) : v; };

// ---------- words for the result ----------
const hi = (x) => x > 0.6, lo = (x) => x < 0.4;
const WHY = {
  en: {
    energy: (p, c, n) => hi(p) && hi(c) ? `You both have energy to burn.` : lo(p) && lo(c) ? `Neither of you is in a hurry to leave the couch.` : `Your pace and ${n}'s are close.`,
    close: (p, c, n) => hi(p) && hi(c) ? `${n} wants to be near someone, and so do you.` : lo(p) && lo(c) ? `You both like company at arm's length.` : `You have about the same idea of personal space.`,
    talk: (p, c, n) => hi(p) && hi(c) ? `${n} talks. You answer. It works.` : lo(p) && lo(c) ? `You both think silence is underrated.` : `You two are about the same volume.`,
    bold: (p, c, n) => hi(p) && hi(c) ? `You both walk into a room like you've been there before.` : lo(p) && lo(c) ? `You both check the exits first.` : `${n} warms up at about your speed.`,
    alone: (p, c, n) => hi(p) ? `${n} does fine alone while you're out living your life.` : `You're around a lot, and ${n} will like the company.`,
    busy: (p, c, n) => hi(p) ? `${n} can handle a full house, and yours is one.` : `Your life is calm enough for ${n}.`,
    care: (p, c, n) => hi(c) ? `${n} needs patience, and you have it.` : `Nothing complicated about ${n}.`,
    groom: (p, c, n) => hi(c) ? `That coat needs a brush, and you like a ritual.` : `Short coat, no brushing, no fuss.`,
  },
  ru: {
    energy: (p, c, n) => hi(p) && hi(c) ? `У вас обоих энергии с запасом.` : lo(p) && lo(c) ? `Никто из вас не спешит вставать с дивана.` : `Вы живёте примерно в одном темпе.`,
    close: (p, c, n) => hi(p) && hi(c) ? `${n} хочет быть рядом с кем-то, и ты тоже.` : lo(p) && lo(c) ? `Вам обоим нужна компания на расстоянии вытянутой руки.` : `У вас похожее понимание личного пространства.`,
    talk: (p, c, n) => hi(p) && hi(c) ? `${n} разговаривает, ты отвечаешь. Всё сходится.` : lo(p) && lo(c) ? `Вы оба считаете, что тишину недооценивают.` : `Вы примерно одной громкости.`,
    bold: (p, c, n) => hi(p) && hi(c) ? `Вы оба заходите в комнату так, будто уже здесь были.` : lo(p) && lo(c) ? `Вы оба сначала ищете, где выход.` : `${n} привыкает к новому примерно с твоей скоростью.`,
    alone: (p, c, n) => hi(p) ? `${n} спокойно побудет в одиночестве, пока тебя нет дома.` : `Ты часто дома, а ${n} любит компанию.`,
    busy: (p, c, n) => hi(p) ? `${n} не боится полного дома, а у тебя как раз такой.` : `У тебя достаточно спокойно. ${n} это оценит.`,
    care: (p, c, n) => hi(c) ? `${n} требует терпения, а оно у тебя есть.` : `${n}: ничего сложного.`,
    groom: (p, c, n) => hi(c) ? `Эту шерсть надо вычёсывать, а ты любишь ритуалы.` : `Шерсть короткая, вычёсывать не нужно.`,
  },
};
const WARN = {
  en: {
    energy: (p, c, n) => c > p ? `${n} has more energy than you do.` : `${n} is calmer than you are.`,
    close: (p, c, n) => c > p ? `${n} wants more contact than you do.` : `${n} keeps more distance than you'd like.`,
    talk: (p, c, n) => c > p ? `${n} is louder than you are.` : `${n} is quieter than you are.`,
    bold: (p, c, n) => c > p ? `${n} is more forward than you are.` : `${n} is shyer than you are.`,
    alone: (p, c, n) => `${n} may get lonely on your long days.`,
    busy: (p, c, n) => `Your life might be a lot for ${n} at first.`,
    care: (p, c, n) => `${n} needs more patience than you showed here. Talk to the shelter first.`,
    groom: (p, c, n) => `${n}'s coat needs more upkeep than you seem to enjoy.`,
  },
  ru: {
    energy: (p, c, n) => c > p ? `${n}: энергии больше, чем у тебя.` : `${n}: спокойнее, чем ты.`,
    close: (p, c, n) => c > p ? `${n} хочет больше контакта, чем ты.` : `${n} держит дистанцию больше, чем тебе хотелось бы.`,
    talk: (p, c, n) => c > p ? `${n}: громче, чем ты.` : `${n}: тише, чем ты.`,
    bold: (p, c, n) => c > p ? `${n}: напористее, чем ты.` : `${n}: застенчивее, чем ты.`,
    alone: (p, c, n) => `${n} может заскучать, пока тебя долго нет.`,
    busy: (p, c, n) => `Поначалу твой ритм жизни может быть для кота слишком шумным.`,
    care: (p, c, n) => `${n} требует больше терпения, чем видно по твоим ответам. Сначала поговори с приютом.`,
    groom: (p, c, n) => `За этой шерстью нужно ухаживать больше, чем тебе, похоже, нравится.`,
  },
};

const face = (c) => `img/cat_${c.id}.png`;
const card = (c, extra = "") => `<figure class="pol"><img src="cats/${c.id}.jpg" alt="${esc(L(c.look))}" loading="lazy"><b><img src="${face(c)}" alt="">${esc(L(c.name))}</b>${extra}</figure>`;
const bars = (rows, cls = "") => `<div class="bars">${rows.map(([a, w, b], i) => `<span>${esc(a)}</span><i class="${cls}" style="--i:${i};width:${Math.max(2, pct(w))}%"></i><span>${esc(b)}</span>`).join("")}</div>`;

// ---------- screens ----------
const screens = {
  home() {
    view.replaceChildren(h(`<section class="panel sign">
      <h1>Purrfect Match</h1>
      <p class="soft">${esc(t("tag"))}</p>
      <div class="row"><button class="btn" id="start">${esc(t("start"))}</button><button class="btn s" data-go="cats">${esc(t("meet"))}</button></div>
      <p class="small soft" style="margin:20px 0 0;font-size:14px">${esc(t("from", L(SHELTER.name), L(SHELTER.city)))} <a href="${SHELTER.link}" target="_blank" rel="noopener">${SHELTER.handle}</a></p></section>`));
    view.querySelector("#start").onclick = () => { answers = []; at = 0; go("quiz"); };
  },
  quiz() {
    const q = QUESTIONS[at], asker = CATS[at % CATS.length], i18 = lang === "ru" ? 1 : 0; setAsker(asker.id);
    view.replaceChildren(h(`<section class="panel quiz">
      <div class="who"><img src="${face(asker)}" alt="">${esc(t("asks", L(asker.name)))}</div>
      <div class="pips" role="img" aria-label="${at + 1} / ${QUESTIONS.length}">${QUESTIONS.map((_, i) => `<i class="${i <= at ? "on" : ""}${i === at ? " now" : ""}"></i>`).join("")}</div>
      <p class="q">${esc(L(q.q))}</p>
      <div class="opts">${q.a.map((o, i) => `<button class="opt" style="--i:${i}" data-i="${i}" aria-pressed="${answers[at] === i}"><i>${i + 1}</i>${esc(o[i18])}</button>`).join("")}</div>
      ${at ? `<div class="row" style="margin-top:18px"><button class="btn s" id="back">${esc(t("back"))}</button></div>` : ""}</section>`));
    view.querySelectorAll(".opt").forEach((b) => (b.onclick = () => pick(+b.dataset.i)));
    const back = view.querySelector("#back"); if (back) back.onclick = () => { at--; go("quiz"); };
  },
  result() {
    if (answers.filter((a) => a != null).length < QUESTIONS.length) return go("home");
    const s = getSim(), me = profile(QUESTIONS, answers), list = rank(me, CATS, importance, s.nudge), top = list[0], c = top.cat, n = L(c.name);
    const byFit = PAIRS.map(([pk, ck]) => ({ pk, ck, f: top.parts[pk], w: me.n[pk] })).filter((x) => x.w > 0.3).sort((a, b) => b.f - a.f);
    const why = byFit.slice(0, 3).map((x) => WHY[lang][x.pk](me.v[x.pk], c.t[x.ck], n));
    const worst = byFit[byFit.length - 1], warn = worst && worst.f < 0.62 ? WARN[lang][worst.pk](me.v[worst.pk], c.t[worst.ck], n) : null;
    if (!screens.result.logged) { const log = load("log2", []); log.push({ t: Date.now(), cat: c.id }); save("log2", log.slice(-200)); screens.result.logged = true; }
    view.replaceChildren(h(`
      <div class="match">
        <figure class="gilt"><canvas id="reveal" width="560" height="560" role="img" aria-label="${esc(L(c.look))}"></canvas><figcaption class="plaque">${esc(n)}</figcaption></figure>
        <section class="panel" style="--face:url(${face(c)})"><div class="rosette">${pct(top.shown)}%</div>
          <p class="soft">${esc(t("yours"))}</p><p class="name">${esc(n)}</p><p class="soft" style="margin-top:6px">${esc(L(c.look))}</p>
          <ul class="why">${why.map((w) => `<li>${esc(w)}</li>`).join("")}${warn ? `<li class="warn">${esc(warn)}</li>` : ""}</ul>
          <div class="row"><a class="btn" style="font-size:21px" href="${SHELTER.link}" target="_blank" rel="noopener">${esc(t("insta", n))}</a></div>
          <div class="row" id="fb" style="margin-top:18px"><span>${esc(t("feel"))}</span><button class="btn s" data-like="1">${esc(t("yes"))}</button><button class="btn s" data-like="0">${esc(t("no"))}</button></div>
        </section>
      </div>
      <section class="panel"><div class="two">
        <div><h2>${esc(t("youAnd", n))}</h2><canvas class="radar" id="radar" width="760" height="760" role="img" aria-label="${esc(t("youAnd", n))}"></canvas><p class="small soft">${esc(t("radar", n))}</p></div>
        <div><h2>${esc(t("byTrait"))}</h2>${bars(PAIRS.map(([pk]) => [LABEL[lang][pk], top.parts[pk], pct(top.parts[pk])]))}
          <h2>${esc(t("also"))}</h2><div class="others">${list.slice(1, 3).map((r) => card(r.cat, `<p>${pct(r.shown)}%</p>`)).join("")}</div></div></div>
        <p class="note">${esc(t("note"))}</p>
        <div class="row" style="margin-top:18px"><button class="btn s" id="again">${esc(t("again"))}</button><button class="btn s" data-go="how">${esc(t("how"))}</button></div></section>`));
    reveal(view.querySelector("#reveal"), `cats/${c.id}.jpg`);
    radar(view.querySelector("#radar"), PAIRS.map(([pk, ck]) => ({ label: LABEL[lang][pk], a: me.v[pk], b: c.t[ck] })));
    view.querySelector("#again").onclick = () => { answers = []; at = 0; go("quiz"); };
    view.querySelectorAll("#fb button").forEach((b) => (b.onclick = () => {
      importance = learn(importance, top.parts, b.dataset.like === "1"); save("importance2", importance); sim = null;
      view.querySelector("#fb").innerHTML = `<span class="soft">${esc(t("thanks"))}</span>`;
    }));
  },
  cats() {
    view.replaceChildren(h(`<section class="panel"><h2>${esc(t("navCats"))}</h2><p class="soft">${esc(t("catsLead", L(SHELTER.name), L(SHELTER.city)))} <a href="${SHELTER.link}" target="_blank" rel="noopener">${SHELTER.handle}</a></p>
      <div class="grid">${CATS.map((c) => card(c, `<p>${esc(L(c.look))}</p>`)).join("")}</div></section>`));
  },
  how() {
    const log = load("log2", []), counts = {}; log.forEach((l) => (counts[l.cat] = (counts[l.cat] || 0) + 1));
    const cut = (x) => (x.length > 30 ? x.slice(0, 30) + "..." : x);
    view.replaceChildren(h(`<section class="panel">
      ${t("howBody").map(([hd, ...ps]) => `<h2>${esc(hd)}</h2>${ps.map((p) => `<p>${esc(p)}</p>`).join("")}`).join("")}
      <h2>${esc(t("devH"))}</h2><p>${esc(t("devP"))}</p>
      ${log.length ? `<p>${esc(t("done", log.length))}</p><div style="margin-top:12px">${bars(Object.entries(counts).sort((a, b) => b[1] - a[1]).map(([id, n]) => [L(CATS.find((c) => c.id === id)?.name || { en: id, ru: id }), n / log.length, n]), "me")}</div>` : `<p class="soft">${esc(t("none"))}</p>`}
      <p style="margin-top:16px">${esc(t("wP"))}</p><div style="margin-top:12px">${bars(PAIRS.map(([pk]) => [LABEL[lang][pk], importance[pk] / 2.2, importance[pk].toFixed(2)]), "me")}</div>
      <div class="row" style="margin-top:20px"><button class="btn s" id="reset">${esc(t("reset"))}</button></div>
      <p class="note">${esc(t("credit"))}</p></section>`));
    view.querySelector("#reset").onclick = () => { importance = { ...DEFAULT_IMPORTANCE }; save("importance2", importance); save("log2", []); sim = null; go("how"); };
  },
};
let busy = false;
function pick(i) {
  if (busy || current !== "quiz") return; busy = true; answers[at] = i;
  view.querySelectorAll(".opt").forEach((b, j) => b.setAttribute("aria-pressed", j === i));
  setTimeout(async () => {
    if (++at < QUESTIONS.length) { busy = false; return go("quiz"); }
    setAsker(null); screens.result.logged = false;
    const top = rank(profile(QUESTIONS, answers), CATS, importance, getSim().nudge)[0].cat;
    await deliberate(CATS, top.id, t("jury")); busy = false; go("result"); confetti(); poke(top.id, L(top.name), 4000);
  }, 170);
}

// the photo comes into focus in a few coarse steps, like a sprite loading
function reveal(cv, src) {
  const ctx = cv.getContext("2d"), img = new Image(), still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  img.onload = () => { const sizes = still ? [560] : [8, 14, 24, 40, 70, 140, 560]; let i = 0;
    const step = () => { const n = sizes[i++]; ctx.imageSmoothingEnabled = false; ctx.drawImage(img, 0, 0, n, n); ctx.drawImage(cv, 0, 0, n, n, 0, 0, 560, 560); if (n === 560) { ctx.imageSmoothingEnabled = true; ctx.drawImage(img, 0, 0, 560, 560); } else setTimeout(step, 110); };
    step(); };
  img.src = src;
}
function radar(cv, rows) {
  const g = cv.getContext("2d"), W = cv.width, cx = W / 2, cy = W / 2, R = W * 0.26, n = rows.length, css = getComputedStyle(document.body);
  const col = (v) => css.getPropertyValue(v).trim(), pt = (i, r) => [cx + Math.sin((i / n) * 2 * Math.PI) * r, cy - Math.cos((i / n) * 2 * Math.PI) * r];
  g.clearRect(0, 0, W, W); g.lineWidth = 3; g.strokeStyle = col("--pip");
  for (const f of [0.33, 0.66, 1]) { g.beginPath(); rows.forEach((_, i) => g.lineTo(...pt(i, R * f))); g.closePath(); g.stroke(); }
  rows.forEach((_, i) => { g.beginPath(); g.moveTo(cx, cy); g.lineTo(...pt(i, R)); g.stroke(); });
  const shape = (key, stroke, alpha) => { g.beginPath(); rows.forEach((r, i) => g.lineTo(...pt(i, R * (0.08 + 0.92 * r[key])))); g.closePath(); g.globalAlpha = alpha; g.fillStyle = stroke; g.fill(); g.globalAlpha = 1; g.strokeStyle = stroke; g.lineWidth = 6; g.stroke(); };
  shape("b", col("--btn"), 0.35); shape("a", col("--hi"), 0.25);
  g.fillStyle = col("--ink"); g.font = '24px PM, monospace'; g.textBaseline = "middle";
  rows.forEach((r, i) => { const [x, y] = pt(i, R + 30); g.textAlign = Math.abs(x - cx) < 20 ? "center" : x > cx ? "left" : "right"; g.fillText(r.label, x, y); });
}

function chrome() {
  document.documentElement.lang = lang; document.body.className = theme;
  document.querySelectorAll("[data-t]").forEach((b) => (b.textContent = t(b.dataset.t)));
  document.getElementById("theme").textContent = theme === "day" ? t("night") : t("day");
  document.getElementById("lang").textContent = lang === "en" ? "RU" : "EN";
}
function go(name) {
  const show = () => { if (name !== "quiz") setAsker(null); current = name; document.body.dataset.s = name; screens[name](); window.scrollTo(0, 0);
    document.querySelectorAll("nav [data-go]").forEach((b) => b.toggleAttribute("aria-current", b.dataset.go === name)); };
  if (name === current) show(); else wipe(show);
}
document.addEventListener("click", (e) => { const b = e.target.closest("[data-go]"); if (b) go(b.dataset.go); });
document.addEventListener("keydown", (e) => { if (current === "quiz" && e.key >= "1" && e.key <= "4") pick(+e.key - 1); });
document.getElementById("theme").onclick = () => { theme = theme === "day" ? "night" : "day"; save("theme", theme); chrome(); if (current === "result") go("result"); };
document.getElementById("lang").onclick = () => { lang = lang === "en" ? "ru" : "en"; save("lang", lang); chrome(); relabel(CATS, (c) => L(c.name)); go(current); };
window.__pm = { finish: (i = 1) => { answers = QUESTIONS.map(() => i); screens.result.logged = false; go("result"); } }; // for testing
chrome(); initRoom(CATS, (c) => L(c.name));
Promise.all([document.fonts.load("20px PM", "Aя"), document.fonts.load("20px PMh", "Aя")]).catch(() => {}).then(() => { current = ""; document.body.dataset.s = "home"; screens.home(); current = "home"; });
