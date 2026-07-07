import { Scores, emptyScores, resolveArchetype, Archetype } from '../data/archetypes';

export interface Question {
  id: string;
  text: { en: string; ru: string; kk: string };
  options: {
    text: { en: string; ru: string; kk: string };
    effect: Partial<Scores>; // which axes this answer nudges
  }[];
}

export function computeScores(
  questions: Question[],
  answers: number[] // index of chosen option per question, same order as questions
): Scores {
  const scores = { ...emptyScores };
  questions.forEach((q, i) => {
    const chosen = q.options[answers[i]];
    if (!chosen) return;
    for (const [axis, value] of Object.entries(chosen.effect)) {
      scores[axis as keyof Scores] += value ?? 0;
    }
  });
  return scores;
}

export function getResult(questions: Question[], answers: number[]): Archetype {
  const scores = computeScores(questions, answers);
  return resolveArchetype(scores);
}