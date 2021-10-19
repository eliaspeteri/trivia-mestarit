/* Server game-logic types */
export type Player = {
  nick: string;
  points: number;
  selectedAnswer: string;
};

export type Question = {
  question: string;
  answers: string[];
  correctAnswer: string;
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
