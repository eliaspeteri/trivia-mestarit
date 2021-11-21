import { Router, Request, Response } from 'express';
import { Question } from '../types';
import logger from '../utils/logger';

import QuestionService from '../services/questions';

const router: Router = Router();

// Get all questions
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    res.json(await QuestionService.getAll());
  } catch (error) {
    res.status(400).send({ error: 'Unable fetch all questions' });
    logger.error((error as any).message);
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  const question: Question | null = await QuestionService.findById(
    req.params.id
  );
  question ? res.json(question) : res.sendStatus(404);

  logger.info(`fetched ${req.params.id}`);
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const response: string = await QuestionService.saveOne({
      ...req.body
    });

    res.json({ message: response });
  } catch (error) {
    res.status(400).send({ error: 'Unable to post a new question.' });
    logger.error((error as any).message);
  }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    QuestionService.removeOne(req.params.id);
    res.status(204);
    logger.info(`removed ${req.params.id}`);
  } catch (error) {
    res.json({ error: 'Question not found' });
    logger.error((error as any).message);
  }
});

export default router;
