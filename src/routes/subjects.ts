import express from 'express';
import Subjects from '../models/subjects';

const router = express.Router();

// Add subject
router.post('/add-subject', async (req, res) => {
  const { body } = req;
  body.createdAt = Date.now().toString();
  try {
    const subjectDB = await Subjects.create(body);
    return res.json({ status: 'OK', subjectDB });
  } catch (error) {
    return res.json({
      status: 'Bad',
      message: 'Bad request',
      error,
    });
  }
});

// Get all subjects
router.get('/get-subjects', async (req, res) => {
  try {
    const subjectsDB = await Subjects.find({ status: true });
    return res.json({ status: 'OK', subjectsDB });
  } catch (error) {
    return res.json({
      status: 'Bad',
      message: 'Bad request',
      error,
    });
  }
});

// Get a subject
router.get('/get-subject/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const subjectDB = await Subjects.find({ _id: id });
    return res.json({ status: 'OK', subjectDB });
  } catch (error) {
    return res.json({
      status: 'Bad',
      message: 'Bad request',
      error,
    });
  }
});

module.exports = router;
