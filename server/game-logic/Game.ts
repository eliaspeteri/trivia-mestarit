import { GameData, Player, Question } from './gametypes';
class Game {
  /** For single question */
  private currentQuestionIndex: number;
  hostNick: string;
  private isGameRunning: boolean;
  readonly roomId: string;
  players: Player[];
  questions: Question[];

  constructor(roomId: string, questions: Question[], hostNick?: string) {
    this.currentQuestionIndex = 0;
    this.hostNick = hostNick || '';
    this.isGameRunning = false;
    this.roomId = roomId;
    this.players = [];
    this.questions = questions;
  }

  /**
   * Add player to game. If host, add second parameter
   * @param nick of player
   * @param isHost is player host
   */
  addPlayer(nick: string, isHost = false): void {
    this.players = this.players.concat({
      nick: nick,
      points: 0,
      selectedAnswer: ''
    });
    if (isHost) this.hostNick = nick;
  }

  /**
   * @returns game data of game
   */
  getGameData(): GameData {
    return {
      hostNick: this.hostNick,
      currentQuestionIndex: this.currentQuestionIndex,
      players: this.players,
      currentQuestion: this.questions[this.currentQuestionIndex],
      questionsTotal: this.questions.length
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

  isLastQuestion(): boolean {
    return this.questions.length === this.currentQuestionIndex;
  }

  /**
   * Set selected answer to player. Doesn't check
   * is answer correct
   * @param nick nickname of player
   * @param answer selected answer
   */
  setPlayerAnswer(nick: string, answer: string): void {
    const newValuePlayer: Player | undefined = this.players.find(
      (player: Player) => nick === player.nick
    );

    if (!newValuePlayer) return;

    newValuePlayer.selectedAnswer = answer;

    this.players = this.players.map((player: Player) =>
      newValuePlayer.nick === player.nick ? newValuePlayer : player
    );
  }

  /**
   * Starts the game and showing questions.
   * Add players and questions before executing this function
   * @param questionTime time how long one question will be displayed (ms)
   */
  startGame(questionTime: number): void {
    this.isGameRunning = true;

    this.checkAnswersInInterval(questionTime);

    const questionTimer = setInterval(() => {
      this.currentQuestionIndex++;

      this.checkAnswersInInterval(questionTime);

      /** Stop game when no more questions */
      if (this.currentQuestionIndex === this.questions.length) {
        clearInterval(questionTimer);
        this.isGameRunning = false;
      }
    }, questionTime);
  }

  private checkAnswersInInterval(questionTime: number): void {
    setTimeout(() => {
      this.checkAndUpdateAnswers();
    }, questionTime - 1000);
  }

  private checkAndUpdateAnswers(): void {
    this.players.forEach((player: Player) => {
      player?.selectedAnswer ===
        this.questions[this.currentQuestionIndex]?.correctAnswer &&
        player.points++;
    });
  }
}

export default Game;