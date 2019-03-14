import ContactModel from '../models/contact';
import SmsModel from '../models/sms';
import StatusModel from '../models/status';
import apiResponse from '../helpers/apiResponse';

export default class SmsController {
  static async sendSms(request, response) {
    const { contactId } = request.params;
    const { message, recipientPhoneNumber } = request.body;

    try {
      const senderContact = await ContactModel.findById(contactId);
      if (!senderContact) return apiResponse.error(response, 404, 'Sender contact not found');

      let phoneNumberToSearch = recipientPhoneNumber;
      if (recipientPhoneNumber.charAt(0) === '0') phoneNumberToSearch = recipientPhoneNumber.substr(1);

      const recipientContact = await ContactModel.findOne({ phone: phoneNumberToSearch });
      if (!recipientContact) return apiResponse.error(response, 404, 'Recipient contact not found');

      if (recipientContact.phone === senderContact.phone) {
        return apiResponse.error(response, 403, 'You are not allowed to message yourself');
      }
      const newSms = new SmsModel({ message });
      newSms.sender = senderContact._id;
      newSms.recipient = recipientContact._id;
      const savedSms = await newSms.save();

      await new StatusModel({ sms: savedSms._id, contact: senderContact._id }).save();
      await new StatusModel({ sms: savedSms._id, contact: recipientContact._id, status: 'RECEIVED' }).save();
      return apiResponse.success(response, 201, 'Successfully sent an sms', savedSms);
    } catch (error) {
      return apiResponse.error(response, 500, error.message);
    }
  }

  static async getAllSms(request, response) {
    const { contactId } = request.params;
    try {
      const contact = await ContactModel.findById(contactId);
      if (!contact) return apiResponse.error(response, 404, 'Contact does not found');
      const allSms = await StatusModel
        .find({ contact: contactId }, '-_id status')
        .populate({ path: 'sms', model: 'sms', select: 'message' });

      return apiResponse.success(response, 200, 'Successfully received all your sent and received messages', allSms);
    } catch (error) {
      return apiResponse.error(response, 500, error.message);
    }
  }
}
