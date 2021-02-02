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

// eslint-disable-next-line consistent-return
const verifyRole = (req: any, res: any, next: any) => {
  // eslint-disable-next-line prefer-const
  let { role } = req.userDB;
  if (role !== 'ADMIN') {
    return res.json({ status: 'OK', message: 'Not authorized' });
  }
  next();
};

export { verifyAuth, verifyRole };
