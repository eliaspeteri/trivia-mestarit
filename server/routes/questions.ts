<<<<<<< HEAD
import { Router, Request, Response } from 'express';
import QuestionModel from '../models/question';
import { Question } from '../types';
=======
import { Response, Request, Router } from 'express';
import QuestionModel from '../models/question';
import { IQuestion } from '../types';
>>>>>>> 1e9bc9a1b698f37cbab2be600185345ea81f9489
import logger from '../utils/logger';

const router: Router = Router();

// Get all questions
router.get('/', async (_req: Request, res: Response): Promise<void> => {
<<<<<<< HEAD
  const questions: Question[] = (await QuestionModel.find({})) as Question[];
=======
  const questions: IQuestion[] = await QuestionModel.find({});
>>>>>>> 1e9bc9a1b698f37cbab2be600185345ea81f9489
  logger.info('fetched all questions!');

  res.json(questions);
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
<<<<<<< HEAD
  const question: Question | null = (await QuestionModel.findById(
    req.params.id
  )) as Question | null;
=======
  const question: IQuestion | null = await QuestionModel.findById(
    req.params.id
  );
>>>>>>> 1e9bc9a1b698f37cbab2be600185345ea81f9489
  question ? res.json(question) : res.sendStatus(404);

  logger.info(`fetched ${req.params.id}`);
});

// Add new question
router.post('/', async (req: Request, res: Response): Promise<void> => {
  const { whoCreated, question, correctAnswer, theme, difficulty, answers } =
    req.body;
  try {
    logger.info(req.body);
    const resQuestion = new QuestionModel({
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

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    await QuestionModel.findByIdAndRemove(req.params.id);
    res.status(204);
    logger.info(`removed ${req.params.id}`);
  } catch (error) {
    res.json({ error: 'Question not found' });
    logger.error((error as any).message);
  }
});

export default router;
