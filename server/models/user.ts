/** Mongoose */
import { model, Schema } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

/** Types */
import { User } from '../types';

export interface IUser extends Document {
  username: string;
  passwordHash: string;
}

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

export default model<IUser>('User', userSchema);
