import express from "express";
import Joi from "joi";

import contactsService from '../../models/contacts.js'

import {HttpError} from '../../helpers/index.js'

const router = express.Router()

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.number().required(),
   email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts()
  res.json(result)
  } catch (error) {
      next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contactsService.getContactById(contactId)
    if (!result) {
      throw HttpError(404, `Contact with id={contactId} not found` )
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await contactsService.addContact(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contactsService.removeContact(contactId)
    if (!result) {
      throw HttpError(404, `Contact with id={contactId} not found` )
    }
    res.json({
      message: "Contact was deleted successfully!"
    })
    // res.json(result)
    // res.status(204).send() 
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body)
    if (!result) {
      throw HttpError(404, `Contact with id={contactId} not found` )
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

export default router;
