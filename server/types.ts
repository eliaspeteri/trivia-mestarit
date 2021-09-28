export type Difficulty = 'easy' | 'medium' | 'hard';

<<<<<<< HEAD
export type Question = {
  id: string;
  whoCreated?: string;
  whenCreated: Date;
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
=======
export interface IQuestion extends Document {
  id: string;
  whoCreated: string;
  whenCreated: Date;
  question: string;
  correctAnswer: string;
  theme: string;
  difficulty: 'easy' | 'medium' | 'hard';
  answers: string[];
}

export interface IUser extends Document {
  id: string;
  username: string;
  passwordHash: string;
}
>>>>>>> 1e9bc9a1b698f37cbab2be600185345ea81f9489
