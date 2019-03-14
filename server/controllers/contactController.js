import ContactModel from '../models/contact';
import SmsModel from '../models/sms';
import StatusModel from '../models/status';
import apiResponse from '../helpers/apiResponse';

export default class ContactController {
  static async addContact(request, response) {
    const { name, phone } = request.body;
    let message = '';
    try {
      const foundContact = await ContactModel.findOne({ $or: [{ name }, { phone }] });
      if (foundContact) {
        let foundPhoneNumber = foundContact.phone.toString();
        if (phone.charAt(0) === '0') foundPhoneNumber = `0${foundPhoneNumber}`;
        if (foundContact.name === name && foundPhoneNumber === phone) message = 'Name and phone number already exist';
        else if (foundContact.name === name) message = 'Name already exist';
        else message = 'Phone number already exist';

        return apiResponse.error(response, 409, message);
      }
      const createdContact = await new ContactModel(request.body).save();
      return apiResponse.success(response, 201, 'Successfully added new contact', createdContact);
    } catch (error) {
      return apiResponse.error(response, 500, error.message);
    }
  }

  static async deleteContact(request, response) {
    const { contactId } = request.params;

    try {
      const deletedContact = await ContactModel.findOneAndRemove({ _id: contactId });
      if (!deletedContact) return apiResponse.error(response, 404, 'Contact was not found');

      await SmsModel.deleteMany({ $or: [{ sender: contactId }, { recipient: contactId }] });
      await StatusModel.deleteMany({ contact: contactId });
      return apiResponse.success(response, 200, 'Successfully deleted contact', deletedContact);
    } catch (error) {
      return apiResponse.error(response, 500, error.message);
    }
  }

  static async getAllContacts(_, response) {
    try {
      const allContacts = await ContactModel.find();
      if (allContacts.length < 1) return apiResponse.success(response, 200, 'There are no contacts available', null);
      return apiResponse.success(response, 200, 'Successfully retrieved all contacts', allContacts);
    } catch (error) {
      return apiResponse.error(response, 500, error.message);
    }
  }
}
