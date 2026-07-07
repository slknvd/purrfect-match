export interface Traits {
  energy: number;
  social: number;
  independence: number;
  vocal: number;
}

export interface Cat {
  id: string;
  name: string;
  age: string;
  archetype: string;
  bio: string;
  photoUrl: string;
  traits: Traits;
}

export interface Question {
  id: string;
  text: string;
  options: { label: string; effect: Partial<Traits> }[];
}

export const ARCHETYPES = {
  chaosAgent: 'The Midnight Chaos Agent',
  copilot: 'The Ghibli Co-pilot',
  diplomat: 'The Elegant Diplomat',
  sunbeam: 'The Sunbeam Sleeper',
  whisperer: 'The Window Whisperer',
} as const;

export const cats: Cat[] = [
  { id: 'barsik', name: 'Barsik', age: '1 yr', archetype: ARCHETYPES.chaosAgent, bio: 'Runs laps at 3am. Loves you violently.', photoUrl: '/cats/barsik.jpg', traits: { energy: 5, social: 4, independence: 2, vocal: 4 } },
  { id: 'murka', name: 'Murka', age: '3 yrs', archetype: ARCHETYPES.copilot, bio: 'Sits beside you while you work. Never asks for much.', photoUrl: '/cats/murka.jpg', traits: { energy: 2, social: 4, independence: 3, vocal: 2 } },
  { id: 'simba', name: 'Simba', age: '2 yrs', archetype: ARCHETYPES.diplomat, bio: 'Greets guests, then retires gracefully.', photoUrl: '/cats/simba.jpg', traits: { energy: 3, social: 3, independence: 4, vocal: 3 } },
  { id: 'plyusha', name: 'Plyusha', age: '4 yrs', archetype: ARCHETYPES.sunbeam, bio: 'Professional napper. Warm lap enthusiast.', photoUrl: '/cats/plyusha.jpg', traits: { energy: 1, social: 3, independence: 3, vocal: 1 } },
  { id: 'dymka', name: 'Dymka', age: '2 yrs', archetype: ARCHETYPES.whisperer, bio: 'Watches birds for hours. Quiet soul.', photoUrl: '/cats/dymka.jpg', traits: { energy: 2, social: 2, independence: 5, vocal: 1 } },
  { id: 'ryzhik', name: 'Ryzhik', age: '1 yr', archetype: ARCHETYPES.chaosAgent, bio: 'Knocks things off tables. Zero regrets.', photoUrl: '/cats/ryzhik.jpg', traits: { energy: 5, social: 3, independence: 3, vocal: 5 } },
  { id: 'busya', name: 'Busya', age: '5 yrs', archetype: ARCHETYPES.copilot, bio: 'Follows you room to room, softly.', photoUrl: '/cats/busya.jpg', traits: { energy: 2, social: 5, independence: 1, vocal: 2 } },
  { id: 'marquiz', name: 'Marquiz', age: '3 yrs', archetype: ARCHETYPES.diplomat, bio: 'Dignified. Accepts affection on schedule.', photoUrl: '/cats/marquiz.jpg', traits: { energy: 3, social: 2, independence: 5, vocal: 2 } },
  { id: 'zefir', name: 'Zefir', age: '2 yrs', archetype: ARCHETYPES.sunbeam, bio: 'Melts into blankets. Purrs like a small engine.', photoUrl: '/cats/zefir.jpg', traits: { energy: 1, social: 4, independence: 2, vocal: 2 } },
  { id: 'tishka', name: 'Tishka', age: '6 yrs', archetype: ARCHETYPES.whisperer, bio: 'Shy at first, devoted forever.', photoUrl: '/cats/tishka.jpg', traits: { energy: 2, social: 2, independence: 4, vocal: 1 } },
  { id: 'greta', name: 'Greta', age: '1 yr', archetype: ARCHETYPES.chaosAgent, bio: 'Parkour champion of the shelter.', photoUrl: '/cats/greta.jpg', traits: { energy: 5, social: 5, independence: 1, vocal: 3 } },
  { id: 'kefir', name: 'Kefir', age: '4 yrs', archetype: ARCHETYPES.copilot, bio: 'Your calm shadow. Great listener.', photoUrl: '/cats/kefir.jpg', traits: { energy: 3, social: 4, independence: 2, vocal: 3 } },
  { id: 'luna', name: 'Luna', age: '2 yrs', archetype: ARCHETYPES.diplomat, bio: 'Polite, curious, quietly in charge.', photoUrl: '/cats/luna.jpg', traits: { energy: 4, social: 3, independence: 4, vocal: 2 } },
  { id: 'pirozhok', name: 'Pirozhok', age: '7 yrs', archetype: ARCHETYPES.sunbeam, bio: 'Senior gentleman. Radiates peace.', photoUrl: '/cats/pirozhok.jpg', traits: { energy: 1, social: 2, independence: 3, vocal: 1 } },
  { id: 'vishnya', name: 'Vishnya', age: '3 yrs', archetype: ARCHETYPES.whisperer, bio: 'Talks to birds through the glass. Poetic.', photoUrl: '/cats/vishnya.jpg', traits: { energy: 3, social: 1, independence: 5, vocal: 4 } },
];
//fake data for now
export const questions: Question[] = [
  {
    id: 'q1',
    text: 'Pick your late-night background frequency:',
    options: [
      { label: 'Lo-fi rain on a window', effect: { energy: -1, vocal: -1 } },
      { label: 'A playlist with friends over', effect: { energy: 1, social: 1 } },
      { label: 'Absolute dead silence', effect: { independence: 1, vocal: -1 } },
    ],
  },
  {
    id: 'q2',
    text: 'Your phone dies for a whole day. Honestly, you feel:',
    options: [
      { label: 'Free', effect: { independence: 1, social: -1 } },
      { label: 'Cut off from everyone', effect: { social: 1 } },
      { label: 'Fine, but restless by evening', effect: { energy: 1 } },
    ],
  },
  {
    id: 'q3',
    text: 'A perfect Sunday morning:',
    options: [
      { label: 'Slow coffee, nowhere to be', effect: { energy: -1 } },
      { label: 'Out the door early, moving', effect: { energy: 1 } },
      { label: 'Long call with someone close', effect: { social: 1, vocal: 1 } },
    ],
  },
  {
    id: 'q4',
    text: 'In group chats, you are:',
    options: [
      { label: 'The one carrying the conversation', effect: { vocal: 1, social: 1 } },
      { label: 'The reactor, rarely the writer', effect: { vocal: -1 } },
      { label: 'Read at 2am, reply never', effect: { independence: 1, social: -1 } },
    ],
  },
  {
    id: 'q5',
    text: 'You move to a new city. First week, you:',
    options: [
      { label: 'Map every cafe alone', effect: { independence: 1, energy: 1 } },
      { label: 'Find your people immediately', effect: { social: 1 } },
      { label: 'Build the perfect room first', effect: { energy: -1, independence: 1 } },
    ],
  },
  {
    id: 'q6',
    text: 'Your energy across a day looks like:',
    options: [
      { label: 'One steady calm line', effect: { energy: -1 } },
      { label: 'Spikes of chaos, then naps', effect: { energy: 1 } },
      { label: 'Slow start, alive at midnight', effect: { energy: 1, vocal: 1 } },
    ],
  },
  {
    id: 'q7',
    text: 'Someone cancels plans last minute. You:',
    options: [
      { label: 'Secretly relieved', effect: { social: -1, energy: -1 } },
      { label: 'Immediately make new plans', effect: { social: 1, energy: 1 } },
      { label: 'Enjoy the surprise solo evening', effect: { independence: 1 } },
    ],
  },
  {
    id: 'q8',
    text: 'When you love something, you:',
    options: [
      { label: 'Tell everyone, loudly', effect: { vocal: 1, social: 1 } },
      { label: 'Keep it as a quiet private joy', effect: { vocal: -1, independence: 1 } },
      { label: 'Deep-dive obsessively alone', effect: { independence: 1, energy: 1 } },
    ],
  },
  {
    id: 'q9',
    text: 'Ideal amount of company at home:',
    options: [
      { label: 'Just me, mostly', effect: { social: -1, independence: 1 } },
      { label: 'One person, always around', effect: { social: 1, independence: -1 } },
      { label: 'A rotating door of friends', effect: { social: 1, energy: 1 } },
    ],
  },
  {
    id: 'q10',
    text: 'Pick a superpower for daily life:',
    options: [
      { label: 'Pause the world, keep moving', effect: { energy: 1, independence: 1 } },
      { label: 'Know what everyone feels', effect: { social: 1, vocal: 1 } },
      { label: 'Perfect deep sleep anywhere', effect: { energy: -1 } },
    ],
  },
];

const BASE: Traits = { energy: 3, social: 3, independence: 3, vocal: 3 };
const clamp = (n: number) => Math.max(1, Math.min(5, n));

export function computeUserTraits(answers: number[]): Traits {
  const t = { ...BASE };
  questions.forEach((q, i) => {
    const opt = q.options[answers[i]];
    if (!opt) return;
    for (const [k, v] of Object.entries(opt.effect)) {
      t[k as keyof Traits] = clamp(t[k as keyof Traits] + (v ?? 0));
    }
  });
  return t;
}

export function findMatch(user: Traits): { cat: Cat; percent: number } {
  let best = cats[0];
  let bestDist = Infinity;
  for (const cat of cats) {
    const d = Math.sqrt(
      (user.energy - cat.traits.energy) ** 2 +
      (user.social - cat.traits.social) ** 2 +
      (user.independence - cat.traits.independence) ** 2 +
      (user.vocal - cat.traits.vocal) ** 2
    );
    if (d < bestDist) { bestDist = d; best = cat; }
  }
  const maxDist = 8;
  const percent = Math.round(99 - (bestDist / maxDist) * 40);
  return { cat: best, percent };
}