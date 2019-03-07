import { Schema, model } from 'mongoose';

const ContactSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
  phone: {
    type: Number,
    unique: true,
    trim: true,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model('contact', ContactSchema);
