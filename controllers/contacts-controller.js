

import contactsService from '../models/contacts.js'

import {ctrlWrapper} from '../decorators/index.js'

import { HttpError } from '../helpers/index.js'



const getListContacts = async (req, res) => {
    const result = await contactsService.listContacts()
    res.json(result)
}

const getOneContactById = async (req, res) => {
    const {contactId} = req.params;
    const result = await contactsService.getContactById(contactId)
    if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found` )
    }
    res.json(result)
}

const addNewContact = async (req, res) => {
    const result = await contactsService.addContact(req.body)
    res.status(201).json(result)
}

const deleteContactById = async (req, res) => {
    const {contactId} = req.params;
    const result = await contactsService.removeContact(contactId)
    if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found` )
    }
    res.json({
    message: "Contact was deleted successfully!"
    })
    // res.json(result)
    // res.status(204).send() 
}

const updateContactById = async (req, res) => {
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body)
    if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found` )
    }
    res.json(result)
}

export default {
    getListContacts: ctrlWrapper(getListContacts),
    getOneContactById: ctrlWrapper(getOneContactById),
    addNewContact: ctrlWrapper(addNewContact),
    deleteContactById: ctrlWrapper(deleteContactById),
    updateContactById: ctrlWrapper(updateContactById)
}