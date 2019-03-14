import express from 'express';
import ContactController from '../controllers/contactController';
import SmsController from '../controllers/smsController';
import verifyId from '../middleware/verifyId';
import { validateContact, validateSms } from '../middleware/validations';

const router = express.Router();

/** CONTACT ROUTES */
// Route for creating contacts
router.route('/contacts/add').post(validateContact, ContactController.addContact);
// Route for getting all available contacts
router.route('/contacts').get(ContactController.getAllContacts);
// Route for deleting a particular contact
router.route('/contacts/:contactId').delete(verifyId, ContactController.deleteContact);

/** SMS ROUTES */
// Route for send an sms
router.route('/sms/:contactId/send').post(verifyId, validateSms, SmsController.sendSms);
// Route for retrieving all user's sent and recieved sms messages
router.route('/sms/:contactId/all').get(verifyId, SmsController.getAllSms);

export default router;
