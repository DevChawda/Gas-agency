import Feedback from '../models/feedbackModel.js';

// Submit feedback
export const submitFeedback = async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: 'Feedback message is required' });

    const feedback = new Feedback({ message });
    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Server error while submitting feedback' });
  }
};

// Get all feedback (for admin)
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ submittedAt: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: 'Server error while fetching feedback' });
  }
};

// Update feedback by ID (for admin)
export const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { message } = req.body;

  try {
    const updatedFeedback = await Feedback.findByIdAndUpdate(
      id,
      { message },
      { new: true, runValidators: true } // 'new: true' returns the updated document
    );

    if (!updatedFeedback) {
      return res.status(404).json({ error: 'Feedback not found' });
    }

    res.status(200).json(updatedFeedback);
  } catch (err) {
    res.status(500).json({ error: 'Server error while updating feedback' });
  }
};