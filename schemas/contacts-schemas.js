import Joi from "joi";

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.number().required(),
   email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
   favorite: Joi.boolean()
})

const contactUpdateFavoriteSchema = Joi.object({
    favorite: Joi.boolean().required()
})

export default {
  contactsAddSchema,
  contactUpdateFavoriteSchema
}