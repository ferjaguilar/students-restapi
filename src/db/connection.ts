import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config({ path: 'keys.env' });

const config = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

const mongoConnection = async (): Promise<void | never> => {
  try {
    await mongoose.connect('mongodb://localhost:27017/db-students', config);
    console.log('🔌 MongoDB is connected');
  } catch (error) {
    throw new Error(`🔧 Error MongoDB connect ${error}`);
  }
};

export default mongoConnection;
