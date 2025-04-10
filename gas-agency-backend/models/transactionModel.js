import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    default: 'pending',
  },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

// ✅ Export it as default
export default Transaction;
