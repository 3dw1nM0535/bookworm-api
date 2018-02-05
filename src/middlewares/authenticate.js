import jwt from 'jsonwebtoken';
import User from '../models/users';

export default (req, res, next) => {
  const header = req.headers.authorization;
  let token;

  if (header) token = header.split(' ')[1];

  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        res.status(401).json({ errors: { global: 'Invalid token' } });
      } else {
        User.findOne({ email: decoded.email }).then(user => {
          req.currentUser = user;
          next();
        });
      }
    })
  } else {
    res.status(401).json({ errors: { global: "No token" } });
  }
};
