import express from 'express';

const router = express.Router();

// Test Route
router.get('/test', (_, res) => {
  res.send('Route testin');
});

module.exports = router;
