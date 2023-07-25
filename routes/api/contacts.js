import express from "express";

import contactsService from '../../models/contacts.js'

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
    res.json(result)
  } catch (error) {
    res.status(500).json({
      message: "Server error"
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
