export type Player = {
  nick: string;
  points: number;
  selectedAnswer: string;
};

export type Question = {
  answers: string[];
  correctAnswer: string;
  question: string;
};

export type GameData = {
  currentQuestion: Question;
  currentQuestionIndex: number;
  hostNick: string;
  players: Player[];
  questionsTotal: number;
  showCorrectAnswer: boolean;
};
