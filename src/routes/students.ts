import express from 'express';
import Students from '../models/students';

const router = express.Router();

// Add new student
router.post('/new-student', async (req, res) => {
  const { body } = req;
  try {
    // Comparation
    const findCode = await Students.findOne({ code: body.code });

    // Validation
    if (findCode) {
      return res.json({ status: 'OK', message: 'This Student alredy exist' });
    }

    // Create new students
    const studentDB = await Students.create(body);
    return res.json({ status: 'OK', studentDB });
  } catch (error) {
    return res.json({
      status: 'Bad',
      message: 'Bad request',
      error,
    });
  }
});

// Get all students
router.get('/get-students', async (req, res) => {
  try {
    const studentsDB = await Students.find();
    return res.json({ status: 'OK', studentsDB });
  } catch (error) {
    return res.json({
      status: 'Bad',
      message: 'Bad request',
      error,
    });
  }
});

// Get a student
router.get('/get-student/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Query get a student
    const studentDB = await Students.findOne({ _id: id });

    // Validation
    if (!studentDB) {
      return res.json({ status: 'OK', message: 'This student do not exist' });
    }

    // Result
    return res.json({ status: 'OK', studentDB });
  } catch (error) {
    return res.json({
      status: 'Bad',
      message: 'Bad request',
      error,
    });
  }
});

module.exports = router;
