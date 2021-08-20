import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import ProfileController from '../constrollers/ProfileController';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(isAuthenticated);

profileRouter
  .route('/')
  .get(profileController.show)
  .put(
    celebrate({
      [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        old_password: Joi.string(),
        password: Joi.string().optional(),
        password_confirmation: Joi.string()
          .valid(Joi.ref('password'))
          .when('password', { is: Joi.exist(), then: Joi.required() }),
      },
    }),
    profileController.update,
  );

export default profileRouter;
