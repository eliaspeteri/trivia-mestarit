export type Question = {
  id: string;
  whoCreated?: string;
  whenCreated: Date;
  question: string;
  correctAnswer: string;
  theme?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  answers: string[];
};

export type User = {
  id: string;
  username: string;
  passwordHash: string;
};
