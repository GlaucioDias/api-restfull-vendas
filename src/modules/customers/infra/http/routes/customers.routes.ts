import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import CustomersController from '../controllers/CustomersController';
import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';

const customersRouter = Router();
const customersController = new CustomersController();

customersRouter.use(isAuthenticated);

customersRouter
  .route('/')
  .get(customersController.index)
  .post(
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      },
    }),
    customersController.create,
  );

customersRouter
  .route('/:id')
  .get(
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    customersController.show,
  )
  .put(
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
      },
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    customersController.update,
  )
  .delete(
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    customersController.delete,
  );

export default customersRouter;
