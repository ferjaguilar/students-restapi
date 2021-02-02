import express from 'express';
import { verifyAuth, verifyRole } from '../middlewares/Authentication';
import Inscriptions from '../models/inscriptions';

const router = express.Router();

// Add new inscription
router.post('/add-inscriptions', verifyAuth, async (req, res) => {
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
router.get('/get-inscriptions', verifyRole, async (req, res) => {
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
router.get('/get-inscription/:id', verifyAuth, async (req, res) => {
  const { id } = req.params;
  try {
    // Comparation
    const findInscription = await Inscriptions.findOne({ _id: id })
      .populate('student', 'code name lastName')
      .populate('subjects', 'code subject schedule');

    // Validation
    if (!findInscription) {
      return res.json({ status: 'OK', message: 'Inscription information dont found' });
    }

    return res.json({ status: 'OK', findInscription });
  } catch (error) {
    return res.json({
      status: 'Bad',
      message: 'Bad request',
      error,
    });
  }
});

// Diable inscription
router.delete('disable-inscription/:id', [verifyAuth, verifyRole], async (req:any, res:any) => {
  const { id } = req.params;
  try {
    const findInscription = await Inscriptions.findOne({ _id: id });

    if (!findInscription) {
      return res.json({ status: 'OK', message: 'Inscription dont found' });
    }

    const inscriptionDB = await Inscriptions.findByIdAndUpdate(
      { _id: id }, { status: false }, { new: true },
    );
    return res.json({ status: 'OK', inscriptionDB });
  } catch (error) {
    return res.json({
      status: 'Bad',
      message: 'Bad request',
      error,
    });
  }
});

module.exports = router;
