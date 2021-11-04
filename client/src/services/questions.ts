import axios from 'axios'

/** Types */
import { Question } from 'game-common';

const BASE_URL = 'api/questions';

const create = async (newQuestion: Question): Promise<string> => {
  const request = axios.post(BASE_URL, newQuestion);
  const response = await request;
  return response.data;
}

const QuestionService = {
  create
};

export default QuestionService;
 

