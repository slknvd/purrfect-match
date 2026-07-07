import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { questions } from '../data/gameData';

export default function QuizEngine({ onDone }: { onDone: (answers: number[]) => void }) {
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const q = questions[idx];

  function pick(optionIndex: number) {
    const next = [...answers, optionIndex];
    if (idx + 1 >= questions.length) onDone(next);
    else { setAnswers(next); setIdx(idx + 1); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="console-frame w-full max-w-2xl p-8 md:p-12">
        <p className="font-mono text-xs text-forest/50 mb-6">
          SOUL-SYNC {idx + 1} / {questions.length}
        </p>
        <div className="h-2 bg-cream rounded-full mb-8 overflow-hidden">
          <motion.div
            className="h-full bg-matcha"
            animate={{ width: `${((idx + 1) / questions.length) * 100}%` }}
            transition={{ type: 'spring', stiffness: 120, damping: 20 }}
          />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.28 }}
          >
            <h2 className="text-lg md:text-xl text-forest mb-8 leading-relaxed"
                style={{ fontFamily: 'var(--font-pixel)', fontSize: '0.95rem', lineHeight: 1.9 }}>
              {q.text}
            </h2>
            <div className="grid gap-4">
              {q.options.map((opt, i) => (
                <motion.button
                  key={opt.label}
                  whileHover={{ scale: 1.02, x: 6 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => pick(i)}
                  className="text-left bg-cream hover:bg-blush/40 border-2 border-forest/10 hover:border-terracotta rounded-xl px-6 py-4 transition-colors"
                >
                  <span className="font-mono text-terracotta mr-3">{String.fromCharCode(65 + i)})</span>
                  {opt.label}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}