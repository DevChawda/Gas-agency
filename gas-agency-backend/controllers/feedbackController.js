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

// feedbackController.js
export const updateFeedback = async (req, res) => {
  const { id } = req.params;
  const { message, submittedAt } = req.body;

  try {
    const feedback = await Feedback.findById(id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }

    feedback.message = message || feedback.message;
    feedback.submittedAt = submittedAt || feedback.submittedAt;
    await feedback.save();

    res.status(200).json({ message: 'Feedback updated successfully', feedback });
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ message: 'Failed to update feedback' });
  }
};


export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    res.status(200).json({ message: 'Feedback deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message || 'Failed to delete feedback' });
  }
};