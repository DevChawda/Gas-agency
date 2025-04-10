import mongoose from 'mongoose';

const enquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  message: { type: String, required: true },
  quantity: { type: Number, required: true },
  type: { type: String, enum: ['IPG', 'Lubes'], required: true },
}, { timestamps: true });

const Enquiry = mongoose.model('Enquiry', enquirySchema);
export default Enquiry;