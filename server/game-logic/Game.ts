const mockUpQuestions: Question[] = [
  {
    answers: ['A', 'B', 'C', 'D'],
    correctAnswer: 'a',
    question: 'Question 1'
  },
  {
    answers: ['1', '2', '3', '4'],
    correctAnswer: 'a',
    question: 'Question 2'
  },
  {
    answers: ['A', 'B', 'C', 'D'],
    correctAnswer: 'a',
    question: 'Question 3'
  }
];

type Player = {
  nick: string;
  points: number;
};

type Question = {
  question: string;
  answers: string[];
  correctAnswer: string;
};

export type GameData = {
  players: Player[];
  question: Question;
  questionCount: number;
  currentQuestionNumber: number;
};

class Game {
  /** For single question */
  private currentQuestionIndex: number;
  hostNick: string;
  private isGameRunning: boolean;
  readonly roomId: string;
  players: Player[];
  questions: Question[];

  constructor(roomId: string, hostNick?: string) {
    this.currentQuestionIndex = 0;
    this.hostNick = hostNick || '';
    this.isGameRunning = false;
    this.roomId = roomId;
    this.players = [];
    this.questions = mockUpQuestions;
  }

  /**
   * Add player to game. If host, add second parameter
   * @param nick of player
   * @param isHost is player host
   */
  addPlayer(nick: string, isHost = false): void {
    this.players = this.players.concat({ nick: nick, points: 0 });
    if (isHost) this.hostNick = nick;
  }

  /**
   * @returns game data of game
   */
  getGameData(): GameData {
    return {
      currentQuestionNumber: this.currentQuestionIndex,
      players: this.players,
      question: this.questions[this.currentQuestionIndex],
      questionCount: this.questions.length
    };
  }

  /**
   * Check answer. If its correct,
   * one point will be added to player
   * @param nickName of player
   * @param answer of player
   */
  isCorrectAnswer(nickName: string, answer: string): void {
    const player: Player | undefined = this.players.find(
      (player: Player) => player.nick === nickName
    );

    if (!player) return;

    this.questions[this.currentQuestionIndex].correctAnswer === answer &&
      player.points++;
  }

  isGameActive(): boolean {
    return this.isGameRunning;
  }

  /**
   * Starts the game and showing questions.
   * Add players and questions before executing this function
   * @param questionTime time how long one question will be displayed (ms)
   */
  startGame(questionTime: number): void {
    this.isGameRunning = true;
    const questionTimer = setInterval(() => {
      console.log('question timer');
      this.currentQuestionIndex++;

      this.currentQuestionIndex === this.questions.length &&
        clearInterval(questionTimer);
    }, questionTime);
  }
}

export default Game;
