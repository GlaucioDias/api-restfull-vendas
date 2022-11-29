import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import ProductsController from '../controllers/ProductsController';

const productsRouter = Router();

const productsController = new ProductsController();

productsRouter
  .route('/')
  .get(productsController.index)
  .post(
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
      },
    }),
    productsController.create,
  );

productsRouter
  .route('/:id')
  .get(
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    productsController.show,
  )
  .put(
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
      [Segments.BODY]: {
        name: Joi.string().required(),
        price: Joi.number().precision(2).required(),
        quantity: Joi.number().required(),
      },
    }),
    productsController.update,
  )
  .delete(
    celebrate({
      [Segments.PARAMS]: {
        id: Joi.string().uuid().required(),
      },
    }),
    productsController.delete,
  );

export default productsRouter;
