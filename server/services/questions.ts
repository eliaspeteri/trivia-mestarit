/** Types */
import { Question } from '../types';

/** Question (Mongoose) Model */
import QuestionModel from '../models/question';

const findById = async (id: string): Promise<Question | null> =>
  await QuestionModel.findById(id);

const getAll = async (): Promise<Question[]> => await QuestionModel.find({});

const getRandomQuestions = async (amount: number): Promise<Question[]> =>
  await QuestionModel.aggregate([{ $sample: { size: amount } }]);

const removeOne = async (id: string): Promise<unknown> =>
  await QuestionModel.findByIdAndRemove(id);

const saveOne = async (question: Question): Promise<string> => {
  const newQuestion = new QuestionModel({
    ...question,
    whenCreated: new Date()
  });

  await newQuestion.save();
  return 'New Question posted successfully';
};

const QuestionService = {
  findById,
  getAll,
  getRandomQuestions,
  removeOne,
  saveOne
};

export default QuestionService;
