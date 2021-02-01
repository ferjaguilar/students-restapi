import { Document, model, Schema } from 'mongoose';

interface Iinscriptions extends Document {
  student: any;
  inscription: string;
  subjects: any;
  createdAt: string;
  status: boolean;
}

const inscriptionSchema: Schema = new Schema({
  student: { type: Schema.Types.ObjectId, required: [true, 'StudentID is required'], ref: 'Students' },
  inscription: {
    type: String,
    required: [true, 'Inscription is required'],
    enum: ['Ordinary', 'Extraordinary'],
  },
  subjects: [{ type: Schema.Types.ObjectId, required: [true, 'SubjectsID is required'], ref: 'Subjects' }],
  createdAt: { type: String, required: [true, 'CreatedAt is required'] },
  status: { type: Boolean, required: [true, 'Status is required'], default: true },
});

export default model<Iinscriptions>('Inscriptions', inscriptionSchema);
