import {
  Schema, model, Document,
} from 'mongoose';

interface IUser extends Document {
  fullname: string;
  email: string;
  nickname: string;
  password: string;
  createdAt: string;
  status: boolean;
  role: string;
}

const userSchema: Schema = new Schema({
  fullname: { type: String, required: [true, 'Fullname is required'] },
  email: { type: String, unique: [true, 'This email is already in use'], required: [true, 'Email is required'] },
  nickname: { type: String, required: [true, 'Nickname is required'] },
  password: { type: String, required: [true, 'Password is required'] },
  createdAt: { type: String, required: [true, 'Created is required'] },
  status: { type: Boolean, default: true },
  role: { type: String, default: 'TEACHER', enum: ['TEACHER', 'ADMIN'] },
});

export default model<IUser>('Users', userSchema);
