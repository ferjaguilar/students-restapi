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

module.exports = router;
