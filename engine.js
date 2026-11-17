// Matching, simulation and the small learning step. No dependencies; runs in the browser and in node.
import { PAIRS } from "./data.js";

export const DEFAULT_IMPORTANCE = { energy: 1, close: 1, talk: 0.7, bold: 0.9, alone: 1.3, busy: 1.3, care: 1.4, groom: 1.1 };
const TRAITS = PAIRS.map((p) => p[0]);

// answers: array of chosen option indexes (or undefined). Returns { v: estimate per trait, n: how sure we are, 0..1 }
export function profile(questions, answers) {
  const sum = {}, wsum = {};
  questions.forEach((q, i) => {
    const pick = answers[i]; if (pick == null) return;
    for (const [k, val] of Object.entries(q.a[pick].at(-1))) { const w = q.w || 1; sum[k] = (sum[k] || 0) + w * val; wsum[k] = (wsum[k] || 0) + w; }
  });
  const v = {}, n = {};
  for (const k of TRAITS) { v[k] = wsum[k] ? sum[k] / wsum[k] : 0.5; n[k] = Math.min(1, (wsum[k] || 0) / 2); }
  return { v, n };
}

// How well one trait fits, 0..1.
//  match:  the closer the better (a playful person and a playful cat)
//  enough: the cat needs at least as much as the home asks of her (hours alone, a busy home)
//  covers: the person needs at least as much as the cat asks (patience, brushing)
export function fit(kind, person, cat) {
  if (kind === "match") return 1 - Math.abs(person - cat);
  const gap = kind === "enough" ? person - cat : cat - person;
  return gap <= 0 ? 1 : Math.max(0, 1 - gap * 1.6);
}

export function score(p, cat, imp = DEFAULT_IMPORTANCE) {
  let top = 0, bottom = 0; const parts = {};
  for (const [pk, ck, kind] of PAIRS) {
    const f = fit(kind, p.v[pk], cat.t[ck]), w = imp[pk] * p.n[pk];
    parts[pk] = f; top += w * f; bottom += w;
  }
  return { total: bottom ? top / bottom : 0, parts };
}

// nudge: a small bonus for cats the quiz rarely picks, so nobody is invisible. Capped at 3 points.
export function rank(p, cats, imp, nudge = {}) {
  return cats.map((cat) => { const s = score(p, cat, imp); return { cat, ...s, shown: Math.min(1, s.total + (nudge[cat.id] || 0)) }; })
    .sort((a, b) => b.shown - a.shown);
}

// small seeded generator so the simulation gives the same numbers every time
export function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = (a + 0x6d2b79f5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }

// Thousands of made-up visitors answering at random. Tells us how often each cat wins,
// what a typical best score looks like, and how much each question moves the result.
export function simulate(questions, cats, imp = DEFAULT_IMPORTANCE, runs = 3000, seed = 7) {
  const r = rng(seed), wins = Object.fromEntries(cats.map((c) => [c.id, 0])), best = [], moved = questions.map(() => 0);
  for (let i = 0; i < runs; i++) {
    const ans = questions.map((q) => Math.floor(r() * q.a.length));
    const top = rank(profile(questions, ans), cats, imp)[0];
    wins[top.cat.id]++; best.push(top.total);
    if (i < 600) questions.forEach((_, qi) => { const a2 = ans.slice(); a2[qi] = undefined; if (rank(profile(questions, a2), cats, imp)[0].cat.id !== top.cat.id) moved[qi]++; });
  }
  best.sort((a, b) => a - b);
  const share = Object.fromEntries(cats.map((c) => [c.id, wins[c.id] / runs]));
  const fair = 1 / cats.length, nudge = Object.fromEntries(cats.map((c) => [c.id, Math.max(0, Math.min(0.03, (fair - share[c.id]) * 0.3))]));
  return { share, nudge, best, moved: moved.map((m) => m / Math.min(runs, 600)) };
}
export const percentile = (sorted, x) => { let lo = 0, hi = sorted.length; while (lo < hi) { const m = (lo + hi) >> 1; if (sorted[m] < x) lo = m + 1; else hi = m; } return lo / sorted.length; };

// Learning from "this fits" / "not really": traits that fit better than average for a liked match
// gain importance, and lose it for a rejected one. Small steps, clamped, stored on this device only.
export function learn(imp, parts, liked, rate = 0.15) {
  const vals = Object.values(parts), mean = vals.reduce((a, b) => a + b, 0) / vals.length, out = { ...imp };
  for (const k of Object.keys(parts)) out[k] = Math.max(0.4, Math.min(2.2, out[k] + (liked ? 1 : -1) * rate * (parts[k] - mean) * 4));
  return out;
}
