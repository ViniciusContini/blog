import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import PostController from './app/controllers/PostController';
import FileController from './app/controllers/FileController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();
const upload = multer(multerConfig);

routes.post('/create-account', UserController.store);
routes.post('/files', upload.single('file'), FileController.store);
routes.post('/login-sessions', SessionController.store);
routes.put('/update-account', authMiddleware, UserController.update);

routes.get('/posts', authMiddleware, PostController.index);
routes.post('/posting', authMiddleware, PostController.store);
routes.put('/updating-post', authMiddleware, PostController.update);

export default routes;
