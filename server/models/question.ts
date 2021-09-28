import { Schema, model } from 'mongoose';
import { Difficulty, Question } from '../types';

export interface IQuestion extends Document {
  whoCreated: string;
  whenCreated: Date;
  question: string;
  correctAnswer: string;
  theme: string;
  difficulty: Difficulty;
  answers: string[];
}

const questionSchema: Schema = new Schema<Question>({
  whoCreated: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  whenCreated: {
    type: Date,
    required: true,
    minlength: 4
  },
  question: {
    type: String,
    required: true,
    minlength: 3
  },
  correctAnswer: {
    type: String,
    required: true,
    minlength: 3
  },
  theme: {
    type: String,
    required: false,
    minlength: 3
  },
  difficulty: {
    type: String,
    required: true,
    minlength: 3
  },
  answers: {
    type: [String],
    required: true,
    minlength: 1
  }
});

questionSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

export default model<IQuestion>('Question', questionSchema);
