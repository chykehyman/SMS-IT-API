import { Schema, model } from 'mongoose';

const SMSschema = new Schema({
  message: {
    type: String,
    trim: true,
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'contact'
  },
  receiver: {
    type: Schema.Types.ObjectId,
    ref: 'contact'
  },
  status: {
    type: String,
    enum: ['SENT', 'RECEIVED'],
    default: 'SENT'
  }
});

export default model('sms', SMSschema);
