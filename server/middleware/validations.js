import validator from 'validator';
import isEmpty from 'is-empty';
import apiResponse from '../helpers/apiResponse';

const validatePhoneNumber = (inputtedPhoneNumber, errors) => {
  if (!validator.isEmpty(inputtedPhoneNumber)) {
    if (validator.isNumeric(inputtedPhoneNumber)) {
      if (!validator.isLength(inputtedPhoneNumber, { min: 11, max: 15 })) {
        errors.phone = 'Phone number should be between 11 and 15 characters long';
      }
    } else { errors.phone = 'Phone number should contain only numbers'; }
  } else { errors.phone = 'Phone number is required'; }
};

export const validateContact = async (request, response, next) => {
  const { name, phone } = request.body;
  const inputtedName = name.trim();
  const inputtedPhoneNumber = phone.trim();
  const errors = {};

  if (!validator.isEmpty(inputtedName)) {
    if (!validator.isLength(inputtedName, { min: 1, max: 30 })) {
      errors.name = 'Name should be between 1 and 30 characters long';
    }
  } else { errors.name = 'Name is required'; }

  await validatePhoneNumber(inputtedPhoneNumber, errors);

  if (!isEmpty(errors)) {
    return apiResponse.error(response, 400, errors);
  }
  return next();
};

export const validateSms = async (request, response, next) => {
  const { message, recipientPhoneNumber } = request.body;
  const inputtedMessage = message.trim();
  const inputtedPhoneNumber = recipientPhoneNumber.trim();
  const errors = {};

  if (!validator.isEmpty(inputtedMessage)) {
    if (!validator.isLength(inputtedMessage, { min: 1, max: 300 })) {
      errors.name = 'Message should be between 1 and 300 characters long';
    }
  } else { errors.name = 'Message content is required'; }

  await validatePhoneNumber(inputtedPhoneNumber, errors);

  if (!isEmpty(errors)) {
    return apiResponse.error(response, 400, errors);
  }
  return next();
};
