import { Schema, model } from 'mongoose';

const StatusSchema = new Schema({
  sms: {
    type: Schema.Types.ObjectId,
    ref: 'sms'
  },
  contact: {
    type: Schema.Types.ObjectId,
    ref: 'contact'
  },
  status: {
    type: String,
    enum: ['SENT', 'RECEIVED'],
    default: 'SENT'
  }
});

export default model('status', StatusSchema);
