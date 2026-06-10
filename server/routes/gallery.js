import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Gallery from '../models/Gallery.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads', 'gallery');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'gallery-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for images only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|gif|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: fileFilter,
});

// @route   GET /api/gallery
// @desc    Get all gallery images
// @access  Public
router.get('/', async (req, res) => {
  try {
    const gallery = await Gallery.find().sort({ createdAt: -1 });
    res.json({ success: true, data: gallery });
  } catch (error) {
    console.error('Get gallery error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/gallery
// @desc    Upload new gallery image
// @access  Private (Admin)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { title, caption } = req.body;
    const imageUrl = `/uploads/gallery/${req.file.filename}`;

    const gallery = new Gallery({
      title: title || 'Gallery Image',
      caption: caption || '',
      imageUrl,
    });

    await gallery.save();

    res.status(201).json({
      success: true,
      data: gallery,
      message: 'Gallery image uploaded successfully',
    });
  } catch (error) {
    console.error('Upload gallery error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/gallery/:id
// @desc    Delete gallery image
// @access  Private (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const gallery = await Gallery.findById(req.params.id);
    
    if (!gallery) {
      return res.status(404).json({ success: false, message: 'Gallery image not found' });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, '..', gallery.imageUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Gallery.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Gallery image deleted successfully',
    });
  } catch (error) {
    console.error('Delete gallery error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
