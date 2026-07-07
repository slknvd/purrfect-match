import { motion } from 'framer-motion';

const BOOT_LINES = [
  '> PURRFECT MATCH v1.0',
  '> loading whiskers.......... ok',
  '> calibrating soul sensor... ok',
  '> 15 residents waiting', // to change
];

export default function LandingConsole({ onStart }: { onStart: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="console-frame w-full max-w-2xl p-8 md:p-14 text-center">
        <div className="text-left mb-10 space-y-2">
          {BOOT_LINES.map((line, i) => (
            <motion.p
              key={line}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.55 }}
              className="font-mono text-sm text-forest/70"
            >
              {line}
            </motion.p>
          ))}
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.4 }}
          className="text-2xl md:text-4xl leading-relaxed mb-4 text-forest"
          style={{ fontFamily: 'var(--font-pixel)' }}
        >
          Purrfect Match
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.8 }}
          className="text-ink/70 mb-10"
        >
          There is a cat waiting for someone exactly like you.
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          onClick={onStart}
          className="float bg-terracotta text-paper px-8 py-4 rounded-xl shadow-lg text-sm"
          style={{ fontFamily: 'var(--font-pixel)' }}
        >
          <span className="blink">▶</span> PRESS START
        </motion.button>
      </div>
    </div>
  );
}