import jwt from 'jsonwebtoken';
import { User } from '../../models';
import Constants from '../../config/constants';


const { sessionSecret } = Constants.security;


export default function authenticate (req, res, next) {
  const { authorization } = req.headers;
  jwt.verify(authorization, sessionSecret, async (err, decoded) => {
    if (err) {
      return res.sendStatus(401);
    }

    try {
      const user = await User.findOne({ where: { id: decoded.id } });
      if (!user) {
        return res.sendStatus(401);
      }
      req.currentUser = user;
      next();
    } catch (err) {
      next(err);
    }
  });
}
