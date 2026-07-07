import { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function BootScreen({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 2400);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      className="min-h-screen flex items-center justify-center"
      style={{ background: '#161513' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="power-on text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.4, 1] }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="text-gbgreen text-xs tracking-widest"
          style={{ fontFamily: 'var(--font-pixel)' }}
        >
          PURRFECT SYSTEM
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6 }}
          className="text-gbgreen/50 font-mono text-xs mt-4"
        >
          warming up...
        </motion.p>
      </div>
    </motion.div>
  );
}