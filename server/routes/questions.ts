import express from 'express';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Question = require('../models/question');

const router = express.Router();

router.get('/', async (_req, res) => {
  res.header('Access-Control-Allow-Origin', '*');
  const questions = await Question.find({});
  console.log('fetched all questions!');

  res.json(questions);
});

router.post('/', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  try {
    await Question.findByIdAndRemove(req.params.id);
    res.status(204);
  } catch (e) {
    res.json({ error: 'Question not found' });
  }
});
export default router;
