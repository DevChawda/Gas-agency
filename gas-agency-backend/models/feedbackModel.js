import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: 'feedbacks' }
);

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
