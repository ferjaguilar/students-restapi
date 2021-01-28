import { Document, model, Schema } from 'mongoose';

interface ISubjects extends Document {
  code: string;
  subject: string;
  teachers: any;
  schedule: string;
  students: number;
  status: boolean;
  createdAt: string;
}

const SubjectSchema: Schema = new Schema({
  code: { type: String, required: [true, 'Code subject is required'] },
  subject: { type: String, required: [true, 'Subject is required'] },
  teachers: [{
    name: { type: String, required: [true, 'Name is required'] },
    profession: { type: String, required: [true, 'Profession is required'] },
  }],
  schedule: { type: String, required: [true, 'Schedule is required'] },
  students: { type: Number, required: [true, 'Students is required'] },
  status: { type: Boolean, required: [true, 'Status is required'], default: true },
  createdAt: { type: String, required: [true, 'Created at is required'] },
});

export default model<ISubjects>('Subjects', SubjectSchema);
