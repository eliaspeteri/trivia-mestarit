import axios from 'axios'

/** Types */
import { Question } from 'game-common';

const BASE_URL = 'api/questions';

export const create = async (newQuestion: Question): Promise<string> => {
  const request = axios.post(BASE_URL, newQuestion);
  const response = await request;
  return response.data;
}
 

