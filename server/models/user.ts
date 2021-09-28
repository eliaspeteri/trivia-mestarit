import { Schema, model } from 'mongoose';
<<<<<<< HEAD
import { User } from '../types';
import uniqueValidator from 'mongoose-unique-validator';

export interface IUser extends Document {
  username: string;
  passwordHash: string;
}

const userSchema: Schema = new Schema<User>({
=======
import { IUser } from '../types';
import uniqueValidator from 'mongoose-unique-validator';

const userSchema: Schema = new Schema({
>>>>>>> 1e9bc9a1b698f37cbab2be600185345ea81f9489
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

export default model<IUser>('User', userSchema);
