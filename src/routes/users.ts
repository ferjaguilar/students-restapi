import express from 'express';
import bcrypt from 'bcrypt';
import Users from '../models/users';

const router = express.Router();

// Signup
router.post('/signup', async (req, res) => {
  const { body } = req;
  body.password = bcrypt.hashSync(body.password, 10);
  body.createdAt = Date.now().toString();
  try {
    // Comparations
    const findEmail = await Users.findOne({ email: body.email });
    const findNickname = await Users.findOne({ nickname: body.nickname });

    // Validations
    if (findEmail) {
      return res.json({ status: 'OK', message: 'Email is already in use' });
    }
    if (findNickname) {
      return res.json({ status: 'OK', message: 'Nickname is already in use' });
    }

    // Create new user
    const userDB = await Users.create(body);
    return res.json({ status: 'OK', userDB });
  } catch (error) {
    return res.json({
      status: 'Bad',
      message: 'Bad request',
      error,
    });
  }
});

module.exports = router;
