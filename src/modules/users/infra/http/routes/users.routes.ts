import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../constrollers/UsersController';
import isAuthenticated from '../../../../../shared/infra/http/middlewares/isAuthenticated';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UserAvatarController from '../constrollers/UserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter
  .route('/')
  .get(isAuthenticated, usersController.index)
  .post(
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    }),
    usersController.create,
  );

usersRouter
  .route('/:id')
  .get(
    isAuthenticated,
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    usersController.show,
  )
  .put(
    isAuthenticated,
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required(),
      },
    }),
    usersController.update,
  )
  .delete(
    isAuthenticated,
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    usersController.delete,
  );

usersRouter
  .route('/avatar')
  .patch(isAuthenticated, upload.single('avatar'), userAvatarController.update);

export default usersRouter;
