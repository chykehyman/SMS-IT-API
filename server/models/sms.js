import { Schema, model } from 'mongoose';

const SmsSchema = new Schema({
  message: {
    type: String,
    trim: true,
    required: true
  },
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'contact'
  },
  recipient: {
    type: Schema.Types.ObjectId,
    ref: 'contact'
  }
});

export default model('sms', SmsSchema);
