// node check.mjs : the one test. Fails loudly if the matching logic breaks.
import assert from "node:assert";
import { CATS, QUESTIONS, PAIRS } from "./data.js";
import { profile, fit, rank, simulate, learn, DEFAULT_IMPORTANCE } from "./engine.js";
for (const q of QUESTIONS) { assert(q.a.length === 4, q.q.en); for (const o of q.a) for (const k of Object.keys(o.at(-1))) assert(PAIRS.some((p) => p[0] === k), `unknown trait ${k} in "${q.q.en}"`); }
for (const c of CATS) for (const [, ck] of PAIRS) assert(c.t[ck] >= 0 && c.t[ck] <= 1, `${c.id}.${ck}`);
assert(fit("match", 0.8, 0.8) === 1 && fit("enough", 0.2, 0.9) === 1 && fit("enough", 0.9, 0.2) < 0.2 && fit("covers", 0.9, 0.3) === 1 && fit("covers", 0.1, 0.9) < 0.2);
// someone away all day who won't brush should not get the clingy cat or the fluffy one first
const away = QUESTIONS.map((q) => { let best = 0, bi = 0; q.a.forEach((o, i) => { const v = o.at(-1); const s = (v.alone || 0) - (v.groom || 0) - (v.close || 0); if (s > best) { best = s; bi = i; } }); return bi; });
const top = rank(profile(QUESTIONS, away), CATS, DEFAULT_IMPORTANCE)[0].cat;
assert(top.t.indep >= 0.6 && top.t.coat < 0.5, `away-all-day person got ${top.id}`);
const sim = simulate(QUESTIONS, CATS, DEFAULT_IMPORTANCE, 1500);
const shares = Object.values(sim.share); assert(Math.abs(shares.reduce((a, b) => a + b, 0) - 1) < 1e-9);
const l = learn(DEFAULT_IMPORTANCE, { energy: 1, close: 0.2, talk: 0.6, bold: 0.6, alone: 0.6, busy: 0.6, care: 0.6, groom: 0.6 }, true);
assert(l.energy > DEFAULT_IMPORTANCE.energy && l.close < DEFAULT_IMPORTANCE.close);
console.log("ok"); console.log("top-match share:", Object.entries(sim.share).sort((a, b) => b[1] - a[1]).map(([k, v]) => `${k} ${(v * 100).toFixed(1)}%`).join(", "));
console.log("median best score:", sim.best[sim.best.length >> 1].toFixed(3), " most decisive questions:", sim.moved.map((m, i) => [m, i]).sort((a, b) => b[0] - a[0]).slice(0, 3).map(([m, i]) => `Q${i + 1} ${(m * 100).toFixed(0)}%`).join(", "));
