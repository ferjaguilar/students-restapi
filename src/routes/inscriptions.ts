import express from 'express';
import Inscriptions from '../models/inscriptions';

const router = express.Router();

// Add new inscription
router.post('/add-inscriptions', async (req, res) => {
  const { body } = req;
  body.createdAt = Date.now().toString();
  try {
    const inscriptionsDB = await Inscriptions.create(body);
    return res.json({ status: 'OK', inscriptionsDB });
  } catch (error) {
    return res.json({
      status: 'Bad',
      message: 'Bad request',
      error,
    });
  }
});

// Get all inscriptions
router.get('/get-inscriptions', async (req, res) => {
  try {
    const inscriptionsDB = await Inscriptions.find({ status: true })
      .populate('student', 'code name lastName')
      .populate('subjects', 'code subject schedule');
    return res.json({ status: 'OK', inscriptionsDB });
  } catch (error) {
    return res.json({
      status: 'Bad',
      message: 'Bad request',
      error,
    });
  }
});

// Get a inscription
router.get('/get-inscription/:id', async (req, res) => {
  const { id } = req.params;
  try {
    // Comparation
    const foundInscription = await Inscriptions.findOne({ _id: id })
      .populate('student', 'code name lastName')
      .populate('subjects', 'code subject schedule');

    // Validation
    if (!foundInscription) {
      return res.json({ status: 'OK', message: 'Inscription information dont found' });
    }

    return res.json({ status: 'OK', foundInscription });
  } catch (error) {
    return res.json({
      status: 'Bad',
      message: 'Bad request',
      error,
    });
  }
});

module.exports = router;
