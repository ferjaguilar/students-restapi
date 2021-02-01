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

module.exports = router;
