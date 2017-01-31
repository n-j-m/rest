import BaseController from './base-controller';
import { User } from '../../models';


class UsersController extends BaseController {

  whitelist = [
    'first_name',
    'last_name',
    'email',
    'username',
    'password'
  ];

  search = async (req, res, next) => {
    try {
      res.json(await User.findAll());
    } catch (err) {
      next(err);
    }
  }

  fetch = async (req, res, next) => {
    const user = req.user || req.currentUser;

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  }

  create = async (req, res, next) => {
    const params = this.filterParams(req.body, this.whitelist);

    let newUser = User.build({ ...params });

    try {
      const savedUser = await newUser.save();
      const token = savedUser.generateToken();
      res.status(201).json({ token });
    } catch (err) {
      err.status = 400;
      next(err);
    }
  }

  update = async (req, res, next) => {
    const newAttrs = this.filterParams(req.body, this.whitelist);
    req.currentUser.set(newAttrs);

    try {
      res.status(200).json(await req.currentUser.save());
    } catch (err) {
      next(err);
    }
  }

  delete = async (req, res, next) => {
    if (!req.currentUser) {
      return res.sendStatus(403);
    }

    try {
      await req.currentUser.destroy();
      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  }
}


export default new UsersController();
