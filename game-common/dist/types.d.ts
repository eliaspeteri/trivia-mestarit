export declare type Difficulty = 'easy' | 'medium' | 'hard';
export declare type Player = {
    nick: string;
    points: number;
    selectedAnswer: string;
};
export declare type Question = {
    question: string;
    answers: string[];
    correctAnswer: string;
    difficulty?: Difficulty;
};
export declare type GameData = {
    hostNick: string;
    players: Player[];
    currentQuestion: Question;
    questionsTotal: number;
    currentQuestionIndex: number;
    showCorrectAnswer: boolean;
    timeLeftToAnswer: number;
};
