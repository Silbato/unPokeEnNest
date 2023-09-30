import * as Joi from 'joi';

/**Aca ponemos validacions si no creamos el env.config.ts */

/**creamos un validation schema */

export const JoiValidationSchema=Joi.object({

    MongoBBDD:Joi.required(),
    PORT:Joi.number().default(3005),
    DEFAULT_LIMIT:Joi.number().default(6)


})