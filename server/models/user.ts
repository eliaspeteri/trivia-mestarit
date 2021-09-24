import { Schema, model } from 'mongoose';
import { User } from '../types';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema: Schema = new Schema<User>({
  username: {
    type: String,
    required: true,
    minlength: 3
  },
  passwordHash: {
    type: String,
    required: true
  }
});

userSchema.plugin(uniqueValidator);

userSchema.set('toJSON', {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  }
});

export default model<User>('User', userSchema);
