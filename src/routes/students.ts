import express from 'express';
import _ from 'underscore';
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
    const studentsDB = await Students.find({ status: true });
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

// Edit a student
router.put('/edit-student/:id', async (req, res) => {
  const { id } = req.params;
  const body = _.pick(req.body, ['code', 'name', 'lastName', 'email', 'cellphone', 'address']);
  try {
    // Comparation
    const findStudent = await Students.findOne({ _id: id });

    // Validation
    if (!findStudent) {
      return res.json({ status: 'OK', message: 'Student do not found' });
    }

    // Edit Student
    const studentDB = await Students.findByIdAndUpdate({ _id: id }, body, { new: true });
    return res.json({ status: 'OK', studentDB });
  } catch (error) {
    return res.json({
      status: 'Bad',
      message: 'Bad request',
      error,
    });
  }
});

// Disable student
router.delete('/disable-student/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Comparation
    const findStudent = await Students.findOne({ _id: id });

    // Validation
    if (!findStudent) {
      return res.json({ status: 'OK', message: 'Student do not found' });
    }

    // Disable student
    const studentDB = await Students.findByIdAndUpdate(
      { _id: id }, { status: false }, { new: true },
    );
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
