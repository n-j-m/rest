import BaseController from './base-controller';
import { User } from '../../models';


class AuthController extends BaseController {
  login = async (req, res, next) => {
    try {
      const creds = req.body;
      const query = creds.username ? { username: creds.username } :
        { email: creds.email };
      const user = await User.unscoped().findOne({
        where: query
      });

      if (!user || !user.authenticate(creds.password)) {
        const err = new Error('Invalid credentials');
        err.status = 401;
        return next(err);
      }

      const token = user.generateToken();
      return res.status(200).json({ token });
    } catch (err) {
      next(err);
    }
  }
}


export default new AuthController();