import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import UsersController from '../constrollers/UsersController';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter
  .route('/')
  .get(usersController.index)
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
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    usersController.show,
  )
  .put(
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
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    usersController.delete,
  );

export default usersRouter;
