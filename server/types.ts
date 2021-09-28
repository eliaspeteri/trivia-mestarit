import { Document } from 'mongoose';

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
