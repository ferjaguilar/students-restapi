import { Document, model, Schema } from 'mongoose';

interface IStudent extends Document {
  code: string;
  name: string;
  lastName: string;
  email: string;
  cellphone: string;
  address: string;
}

const studentSchema: Schema = new Schema({
  code: { type: String, require: [true, 'Code is required'] },
  name: { type: String, required: [true, 'Name is required'] },
  lastName: { type: String, required: [true, 'Lastname is required'] },
  email: { type: String, unique: [true, 'This email alredy in use'], required: [true, 'Email is required'] },
  cellphone: { type: String, required: [true, 'Cellphone is required'] },
  address: { type: String, required: [true, 'Address is required'] },
  status: { type: Boolean, required: [true, 'Status is required'], default: true },
});

export default model<IStudent>('Students', studentSchema);
