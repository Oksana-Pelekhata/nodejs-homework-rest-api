import express from "express";
import contactsController from '../../controllers/contacts-controller.js'
import contactsSchemas from "../../schemas/contacts-schemas.js";
import {validateBody} from "../../decorators/index.js";
import {isValidId, authenticate}from "../../middlewars/index.js";

const router = express.Router();

router.use(authenticate);

router.get('/', contactsController.getListContacts);

router.get('/:contactId', isValidId, contactsController.getOneContactById)

router.post('/',  validateBody(contactsSchemas.contactsAddSchema), contactsController.addNewContact)

router.delete('/:contactId', isValidId, contactsController.deleteContactById)

router.put('/:contactId', isValidId, validateBody(contactsSchemas.contactsAddSchema), contactsController.updateContactById)

router.patch('/:contactId/favorite', isValidId, validateBody(contactsSchemas.contactUpdateFavoriteSchema), contactsController.updateStatusContact)

export default router;
