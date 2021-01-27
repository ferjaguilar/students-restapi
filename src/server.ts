import express, { json, urlencoded } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import mongoConnection from './db/connection';

const app = express();

dotenv.config({ path: 'keys.env' });

// Settings
app.set('port', process.env.PORT);

// Server Middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(urlencoded({ extended: false }));
app.use(json());

// Routes
app.use('/api', require('./routes/users'));
app.use('/api', require('./routes/students'));

const main = async (): Promise<void | never> => {
  try {
    await app.listen(app.get('port'));
    console.log(`💻 Server running on port ${app.get('port')}`);
    mongoConnection();
  } catch (error) {
    throw new Error(`Server error in ${error}`);
  }
};
main();
