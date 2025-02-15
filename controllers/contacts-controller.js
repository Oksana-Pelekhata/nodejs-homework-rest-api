import Contact from '../models/contact.js';

import { ctrlWrapper } from '../decorators/index.js';

import { HttpError } from '../helpers/index.js';


const getListContacts = async (req, res) => {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20 } = req.query;
    const skip = (page - 1) * limit;
    const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate('owner', "email subscription")
    res.json(result)
}

const getOneContactById = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findById(contactId)
    if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found` )
    }
    res.json(result)
}

const addNewContact = async (req, res) => {
    const { _id: owner } = req.user;
    const result = await Contact.create({...req.body, owner});
    res.status(201).json(result);
}

const deleteContactById = async (req, res) => {
    const {contactId} = req.params;
    const result = await Contact.findByIdAndDelete(contactId)
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
    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if (!result) {
    throw HttpError(404, `Contact with id=${contactId} not found` )
    }
    res.json(result)
}

const updateStatusContact = async (req, res) => {
    const { contactId } = req.params;
    const { favorite } = req.body;

    if (!favorite) {
        return res.status(400).json({ message: "missing field favorite" });
    }

    const result = await Contact.findByIdAndUpdate(contactId, req.body, { new: true })
    if (!result) {
    throw HttpError(404, "Not found" )
    }
    res.json(result)
}

export default {
    getListContacts: ctrlWrapper(getListContacts),
    getOneContactById: ctrlWrapper(getOneContactById),
    addNewContact: ctrlWrapper(addNewContact),
    deleteContactById: ctrlWrapper(deleteContactById),
    updateContactById: ctrlWrapper(updateContactById),
    updateStatusContact: ctrlWrapper(updateStatusContact)
}