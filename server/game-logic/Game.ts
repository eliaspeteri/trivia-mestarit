type Player = {
  nick: string;
  points: number;
};

type Question = {
  question: string;
  answers: string[];
  correctAnswer: string;
};

type GameData = {
  players: Player[];
  questionString: string;
  questionCount: number;
  currentQuestionNumber: number;
};

class Game {
  /** For single question */
  private currentQuestionIndex: number;
  readonly hostNick: string;
  readonly roomId: string;
  players: Player[];
  questions: Question[];

  constructor(roomId: string, hostNick: string) {
    this.currentQuestionIndex = 0;
    this.hostNick = hostNick;
    this.roomId = roomId;
    this.players = [];
    this.questions = [];
  }

  /**
   * @returns game data of game
   */
  getGameData(): GameData {
    return {
      currentQuestionNumber: this.currentQuestionIndex,
      players: this.players,
      questionString: this.questions[this.currentQuestionIndex].question,
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

  /**
   * Starts the game and showing questions.
   * Add players and questions before executing this function
   * @param questionTime time how long one question will be displayed (seconds)
   */
  startGame(questionTime: number): void {
    const questionTimer = setInterval(() => {
      this.currentQuestionIndex++;

      this.currentQuestionIndex === this.questions.length &&
        clearInterval(questionTimer);
    }, questionTime);
  }
}

export default Game;
