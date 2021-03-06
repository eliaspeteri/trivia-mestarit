import { Difficulty } from 'game-common';

export type Question = {
  id?: string;
  whoCreated?: string;
  whenCreated?: Date;
  question: string;
  correctAnswer: string;
  theme?: string;
  difficulty: Difficulty;
  answers: string[];
};

export type User = {
  id: string;
  username: string;
  passwordHash: string;
};
