import mongoose from 'mongoose';

const lpgBookingSchema = new mongoose.Schema({
  orderType: { type: String, default: 'LPG' },
  category: { type: String, required: true },
  product: { type: String, required: true },
  vehicleNumber: { type: String },
  serviceDate: { type: String, required: true },
  serviceTime: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
}, { timestamps: true });

const lubeBookingSchema = new mongoose.Schema({
  orderType: { type: String, default: 'Lubes' },
  category: { type: String, required: true },
  product: { type: String, required: true },
  vehicleNumber: { type: String, required: true },
  serviceDate: { type: String, required: true },
  serviceTime: { type: String, required: true },
  bookingDate: { type: Date, default: Date.now },
  status: { type: String, default: 'Pending' },
}, { timestamps: true });

const LpgBooking = mongoose.model('LpgBooking', lpgBookingSchema);
const LubeBooking = mongoose.model('LubeBooking', lubeBookingSchema);

export { LpgBooking, LubeBooking };