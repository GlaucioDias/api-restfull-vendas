import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import OrdersController from '../controllers/OrdersController';

const ordersRouter = Router();

const ordersController = new OrdersController();

ordersRouter.use(isAuthenticated);

ordersRouter.route('/').post(
  celebrate({
    [Segments.BODY]: {
      customer_id: Joi.string().uuid().required(),

      products: Joi.required(),
    },
  }),
  ordersController.create,
);

ordersRouter.route('/:id').get(
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  ordersController.show,
);

export default ordersRouter;
