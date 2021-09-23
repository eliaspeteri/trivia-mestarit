import questions from '../data/questions';

import { Question } from '../types';

const getQuestions = (): Question[] => {
  return questions;
};

export default {
  getQuestions
};
