import { Schema, model } from 'mongoose';

/** Types */
import { Question } from '../types';
import { Difficulty } from 'game-common';

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
    ref: 'User',
    required: false
  },
  whenCreated: {
    type: Date,
    required: false,
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
    minlength: 1
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
