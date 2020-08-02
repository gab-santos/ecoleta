import { celebrate, Joi } from "celebrate";

class PointsValidators {
  create() {
    return celebrate(
      {
        body: Joi.object().keys({
          name: Joi.string().required(),
          email: Joi.string().email().required(),
          whatsapp: Joi.string().required(),
          latitude: Joi.number().required(),
          longitude: Joi.number().required(),
          uf: Joi.string().max(2).required(),
          city: Joi.string().required(),
          items: Joi.string().required(),
        }),
      },
      {
        abortEarly: false,
      }
    );
  }
}

export default new PointsValidators();
