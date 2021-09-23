export type Question = {
  id: string;
  whoCreated?: string;
  whenCreated: string;
  question: string;
  correctAnswer: string;
  theme?: string;
  difficulty: Difficulty;
  answers: string[];
};

export enum Difficulty {
  Easy = 'easy',
  Medium = 'medium',
  Hard = 'hard'
}

export type User = {
  id: string;
  username: string;
  questions: Question[];
};
