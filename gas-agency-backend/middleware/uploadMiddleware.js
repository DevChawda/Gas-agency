import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Define the directory to save uploaded images
const uploadDir = path.join(process.cwd(), 'public', 'Images', 'profileImages');

// Create the folder if it doesn't exist
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up storage engine
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('Uploading file:', file.originalname);
    cb(null, uploadDir); // Local filesystem path, not URL
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File filter to allow only image types
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);
  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only JPEG, JPG, or PNG images are allowed'));
  }
};

// Multer middleware
const upload = multer({
  storage,
  fileFilter,
});

export default upload;
