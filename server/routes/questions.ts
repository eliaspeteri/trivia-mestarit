import { Router, Request, Response } from 'express';
import Question from '../models/question';

const router: Router = Router();

// Get all questions
router.get('/', async (_req: Request, res: Response) => {
  const questions = await Question.find({});
  console.log('fetched all questions!');

  res.json(questions);
});

// Get question by ID
router.get('/:id', async (req: Request, res: Response) => {
  const question = Question.findById(req.params.id);
  if (question) {
    res.json(question);
  } else res.sendStatus(404);
});

// Add new question
router.post('/', async (req: Request, res: Response) => {
  const body = req.body;
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

    const savedQuestion = await question.save();

    res.json(savedQuestion.toJSON());
  } catch (e) {
    res.status(400).send({ error: 'Unable to post a new question.' });
  }
});

// Delete a question
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await Question.findByIdAndRemove(req.params.id);
    res.status(204);
  } catch (e) {
    res.json({ error: 'Question not found' });
  }
});

export default router;
