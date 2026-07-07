import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cats, type Cat, type Traits } from '../data/gameData';

const WHATSAPP_PHONE = '77021014335'; // personal num for now to test

function waLink(cat: Cat) {
  const msg = encodeURIComponent(
    `Hi! I just completed the Purrfect Match quiz and got matched with ${cat.name} (${cat.archetype}). I would love to meet them!`
  );
  return `https://wa.me/${WHATSAPP_PHONE}?text=${msg}`;
}

function StatBar({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-3">
      <span className="font-mono text-xs w-28 text-forest/60">{label}</span>
      <div className="flex-1 h-3 bg-cream rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gold"
          initial={{ width: 0 }}
          animate={{ width: `${(value / 5) * 100}%` }}
          transition={{ duration: 0.8, delay: 0.4 }}
        />
      </div>
    </div>
  );
}

export default function RevealView({ cat, percent }: { cat: Cat; percent: number }) {
  const [phase, setPhase] = useState<'scanning' | 'reveal'>('scanning');
  const [flickerName, setFlickerName] = useState(cats[0].name);

  useEffect(() => {
    let i = 0;
    const spin = setInterval(() => {
      setFlickerName(cats[i % cats.length].name);
      i++;
    }, 90);
    const stop = setTimeout(() => {
      clearInterval(spin);
      setPhase('reveal');
    }, 2600);
    return () => { clearInterval(spin); clearTimeout(stop); };
  }, []);

  if (phase === 'scanning') {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="console-frame w-full max-w-md p-12 text-center">
          <p className="font-mono text-xs text-forest/50 mb-6">FINDING WHO'S BEEN WAITING...</p>
          <p className="text-2xl text-terracotta" style={{ fontFamily: 'var(--font-pixel)' }}>
            {flickerName}
          </p>
        </div>
      </div>
    );
  }

  const t: Traits = cat.traits;
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 16 }}
        className="console-frame w-full max-w-xl p-8 md:p-10 text-center"
      >
        <p className="font-mono text-xs text-forest/50 mb-4">MATCH LOCKED</p>
        <p className="text-gold text-3xl mb-6" style={{ fontFamily: 'var(--font-pixel)' }}>
          {percent}%
        </p>

        <div className="bg-paper border-8 border-cream shadow-lg rounded-lg p-3 inline-block rotate-1 mb-6">
          <img src={cat.photoUrl} alt={cat.name}
               className="w-56 h-56 object-cover rounded"
               style={{ imageRendering: 'pixelated' }} />
          <p className="mt-3 text-forest" style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.8rem' }}>
            {cat.name}, {cat.age}
          </p>
        </div>

        <p className="text-terracotta mb-2 text-sm" style={{ fontFamily: 'var(--font-pixel)' }}>
          {cat.archetype}
        </p>
        <p className="text-ink/70 mb-8">{cat.bio}</p>

        <div className="space-y-3 mb-10 text-left max-w-sm mx-auto">
          <StatBar label="ENERGY" value={t.energy} />
          <StatBar label="SOCIAL" value={t.social} />
          <StatBar label="INDEPENDENCE" value={t.independence} />
          <StatBar label="VOCAL" value={t.vocal} />
        </div>

        <motion.a
          href={waLink(cat)}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          className="inline-block bg-forest text-paper px-8 py-4 rounded-xl shadow-lg text-xs"
          style={{ fontFamily: 'var(--font-pixel)' }}
        >
          Adopt {cat.name} via WhatsApp →
        </motion.a>
        <p className="mt-4 text-xs text-ink/50">From I Am Alive Shelter, Astana</p>
      </motion.div>
    </div>
  );
}