/* Server game-logic types */

export type Difficulty = 'easy' | 'medium' | 'hard';

export type Player = {
  nick: string;
  points: number;
  selectedAnswer: string;
};

export type Question = {
  question: string;
  answers: string[];
  correctAnswer: string;
  difficulty: Difficulty;
};

export type GameData = {
  hostNick: string;
  players: Player[];
  currentQuestion: Question;
  questionsTotal: number;
  currentQuestionIndex: number;
  showCorrectAnswer: boolean;
  timeLeftToAnswer: number;
};
