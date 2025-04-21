const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload'); // Import the upload middleware

const Resume = require('../models/Resume');
const authMiddleware = require('../middlewares/authMiddleware'); // Import authMiddleware

// POST /api/uploads
router.post('/uploads', authMiddleware, upload.single('resume'), async (req, res) => {
  try {
    const { userId } = req.body;

    // Use the authenticated user's ID from the token (req.user)
    if (req.user !== userId) {
      return res.status(403).json({ error: 'User not authorized to upload resume' });
    }

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create a new Resume entry in the database
    const newResume = new Resume({
      userId: req.user,  // Correct the userId here
      filename: req.file.filename,
      filePath: req.file.path,
      uploadedAt: new Date(),
    });

    await newResume.save();

    res.status(200).json({
      message: 'Resume uploaded successfully',
      filePath: req.file.path,
    });
  } catch (error) {
    console.error('Resume Upload Error:', error);
    res.status(500).json({ error: 'Resume upload failed' });
  }
});

module.exports = router;
