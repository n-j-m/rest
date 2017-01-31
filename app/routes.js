import { Router } from 'express';

import AuthController from './controllers/auth-controller';
import UsersController from './controllers/users-controller';

import authenticate from './middleware/authenticate';
import accessControl from './middleware/access-control';
import errorHandler from './middleware/error-handler';


const routes = new Router();


// Authenticate
routes.post('/auth/login', AuthController.login)


// Users
routes.get('/users', UsersController.search);
routes.post('/users', UsersController.create);
routes.get('/users/me', authenticate, UsersController.fetch);
routes.put('/users/me', authenticate, UsersController.update);
routes.delete('/users/me', authenticate, UsersController.delete);
routes.get('/users/:username', UsersController.fetch);


// Error handler
routes.use(errorHandler);


export default routes;
