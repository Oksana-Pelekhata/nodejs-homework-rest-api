import Joi from "joi";

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.number().required(),
   email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
})

export default {
    contactsAddSchema
}