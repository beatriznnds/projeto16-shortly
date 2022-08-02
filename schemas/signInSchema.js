import Joi from 'joi';

const signInSchema = Joi.object({
    name: Joi.string()
    .required(),
    password: Joi.string()
    .required()
})

export default signInSchema;