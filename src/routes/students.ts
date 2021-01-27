import express from 'express';
import Students from '../models/students';

const router = express.Router();

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

module.exports = router;