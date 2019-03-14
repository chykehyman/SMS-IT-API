import { Types } from 'mongoose';
import apiResponse from '../helpers/apiResponse';

export default (request, response, next) => {
  const { contactId } = request.params;
  if (!Types.ObjectId.isValid(contactId)) {
    return apiResponse.error(response, 422, 'Invalid contact id provided');
  }
  return next();
};
