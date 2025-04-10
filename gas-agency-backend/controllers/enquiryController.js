import Enquiry from '../models/enquiryModel.js';

// @desc   Create a new enquiry
// @route  POST /api/enquiries
// @access Public
export const createEnquiry = async (req, res) => {
  try {
    const { name, mobile, address, message, quantity, type } = req.body;

    console.log("➡️ Received request body for /api/enquiries:", req.body);

    if (!name || !mobile || !address || !message || !quantity || !type) {
      console.log("⚠️ Validation failed: Missing required fields");
      return res.status(400).json({ message: 'All fields are required' });
    }

    if (mobile.length !== 10) {
      console.log("⚠️ Validation failed: Mobile number is not 10 digits:", mobile);
      return res.status(400).json({ message: 'Mobile number must be 10 digits' });
    }

    const newEnquiry = new Enquiry({
      name,
      mobile,
      address,
      message,
      quantity,
      type,
    });

    console.log("🛠️ Created new Enquiry object:", newEnquiry);

    const savedEnquiry = await newEnquiry.save();

    console.log("💾 Successfully saved enquiry to database:", savedEnquiry);

    res.status(201).json({ message: 'Enquiry created successfully', enquiry: savedEnquiry });
  } catch (error) {
    console.error('🚨 Error creating enquiry:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc   Get all enquiries
// @route  GET /api/enquiries
// @access Public
export const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });
    res.status(200).json(enquiries);
  } catch (error) {
    console.error('Fetch Enquiries Error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};