import express from "express";
import contactsController from '../../controllers/contacts-controller.js'
import contactsSchemas from "../../schemas/contacts-schemas.js";
import {validateBody} from "../../decorators/index.js";

const router = express.Router()

router.get('/', contactsController.getListContacts)

router.get('/:contactId', contactsController.getOneContactById)

router.post('/', validateBody(contactsSchemas.contactsAddSchema), contactsController.addNewContact)

router.delete('/:contactId', contactsController.deleteContactById)

router.put('/:contactId', validateBody(contactsSchemas.contactsAddSchema), contactsController.updateContactById)

export default router;
