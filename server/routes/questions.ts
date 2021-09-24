import { Router, Request, Response } from 'express';
import Question, { IQuestion } from '../models/question';
import logger from '../utils/logger';
const router: Router = Router();

// Get all questions
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  const questions: IQuestion[] | null = await Question.find({});
  logger.info('fetched all questions!');

  res.json(questions);
});

// Get question by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const question: IQuestion | null = await Question.findById(req.params.id);
  question ? res.json(question) : res.sendStatus(404);

  logger.info(`fetched ${req.params.id}`);
});

// Add new question
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { whoCreated, question, correctAnswer, theme, difficulty, answers } =
    req.body;
  try {
    logger.info(req.body);
    const resQuestion = new Question({
      whoCreated: whoCreated,
      whenCreated: Date(),
      question: question,
      correctAnswer: correctAnswer,
      theme: theme,
      difficulty: difficulty,
      answers: answers
    });

    await resQuestion.save();

    res.json({ message: `posted a new question from ${whoCreated}` });
  } catch (error) {
    res.status(400).send({ error: 'Unable to post a new question.' });
    logger.error((error as any).message);
  }
});

// Delete a question
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    await Question.findByIdAndRemove(req.params.id);
    res.status(204);
    logger.info(`removed ${req.params.id}`);
  } catch (error) {
    res.json({ error: 'Question not found' });
    logger.error((error as any).message);
  }
});

export default router;
