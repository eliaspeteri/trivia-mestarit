import { Router, Request, Response } from 'express';
import Question from '../models/question';
import logger from '../utils/logger';
const router: Router = Router();

// Get all questions
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  const questions: any = (await Question.find({})) as any;
  logger.info('fetched all questions!');

  res.json(questions);
});

// Get question by ID
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const question: any = (await Question.findById(req.params.id)) as any;
  question ? res.json(question) : res.sendStatus(404);

  logger.info(`fetched ${req.params.id}`);
});

// Add new question
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const body: any = req.body as any;
  try {
    console.log(body);
    const question = new Question({
      whoCreated: body.whoCreated,
      whenCreated: Date(),
      question: body.question,
      correctAnswer: body.correctAnswer,
      theme: body.theme,
      difficulty: body.difficulty,
      answers: body.answers
    });

    const savedQuestion: any = (await question.save()) as any;

    res.json(savedQuestion.toJSON());
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
