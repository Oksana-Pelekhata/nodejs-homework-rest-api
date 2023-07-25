import express from "express";

import contactsService from '../../models/contacts.js'

import {HttpError} from '../../helpers/index.js'

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts()
  res.json(result)
  } catch (error) {
    res.status(500).json({
      message: "Server error"
    })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contactsService.getContactById(contactId)
    if (!result) {
      throw HttpError(404, `Contact with id={contactId} not found` )
      const error = new Error(`Contact with id={contactId} not found`)
      error.status = 404;
      throw error;
    }
    res.json(result)
  } catch (error) {
    const { status = 500, message = "Server error" } = error;
    res.status(status).json({
      message
    })
  }
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

export default router;
