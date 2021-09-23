export interface Question {
  id: string;
  whoCreated?: string;
  whenCreated: Date;
  question: string;
  correctAnswer: string;
  theme?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  answers: string[];
}

export interface User {
  id: string;
  username: string;
  passwordHash: string;
}
