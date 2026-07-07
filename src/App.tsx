import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BootScreen from './components/BootScreen';
import LandingConsole from './components/LandingConsole';
import QuizEngine from './components/QuizEngine';
import RevealView from './components/RevealView';
import { computeUserTraits, findMatch, type Cat } from './data/gameData';

type View = 'BOOT' | 'LANDING' | 'QUIZ' | 'REVEAL';

export default function App() {
  const [view, setView] = useState<View>('BOOT');
  const [result, setResult] = useState<{ cat: Cat; percent: number } | null>(null);

  function handleQuizDone(answers: number[]) {
    const traits = computeUserTraits(answers);
    setResult(findMatch(traits));
    setView('REVEAL');
  }

  return (
    <AnimatePresence mode="wait">
      {view === 'BOOT' && (
        <motion.div key="boot" exit={{ opacity: 0 }}>
          <BootScreen onDone={() => setView('LANDING')} />
        </motion.div>
      )}
      {view === 'LANDING' && (
        <motion.div key="landing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <LandingConsole onStart={() => setView('QUIZ')} />
        </motion.div>
      )}
      {view === 'QUIZ' && (
        <motion.div key="quiz" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
          <QuizEngine onDone={handleQuizDone} />
        </motion.div>
      )}
      {view === 'REVEAL' && result && (
        <motion.div key="reveal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
          <RevealView cat={result.cat} percent={result.percent} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}