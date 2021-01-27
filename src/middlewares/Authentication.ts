import jwt from 'jsonwebtoken';

const verifyAuth = (req: any, res: any, next: any) => {
  // eslint-disable-next-line prefer-const
  let token = req.get('token');

  // eslint-disable-next-line consistent-return
  jwt.verify(token, 'pipperperry', (err: any, decoded: any) => {
    if (err) {
      return res.json({ status: 'OK', message: 'Invalid token' });
    }

    req.userDB = decoded.data;
    next();
  });
};

module.exports = { verifyAuth };
