import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import Music from '../models/Music.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads', 'music');
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
    cb(null, 'music-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// File filter for audio only
const fileFilter = (req, file, cb) => {
  const allowedTypes = /mp3|wav|ogg|m4a/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only audio files are allowed!'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: fileFilter,
});

// @route   GET /api/music
// @desc    Get all music
// @access  Public
router.get('/', async (req, res) => {
  try {
    const music = await Music.find().sort({ createdAt: -1 });
    res.json({ success: true, data: music });
  } catch (error) {
    console.error('Get music error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/music/latest
// @desc    Get latest music (for frontend player)
// @access  Public
router.get('/latest', async (req, res) => {
  try {
    const music = await Music.findOne().sort({ createdAt: -1 });
    if (!music) {
      return res.json({ success: true, data: null });
    }
    res.json({ success: true, data: music });
  } catch (error) {
    console.error('Get latest music error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/music
// @desc    Upload new music
// @access  Private (Admin)
router.post('/', upload.single('musicFile'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const { name } = req.body;
    const fileUrl = `/uploads/music/${req.file.filename}`;
    const fileName = req.file.originalname;

    const music = new Music({
      name: name || fileName,
      fileUrl,
      fileName,
    });

    await music.save();

    res.status(201).json({
      success: true,
      data: music,
      message: 'Music uploaded successfully',
    });
  } catch (error) {
    console.error('Upload music error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/music/:id
// @desc    Delete music
// @access  Private (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const music = await Music.findById(req.params.id);
    
    if (!music) {
      return res.status(404).json({ success: false, message: 'Music not found' });
    }

    // Delete file from filesystem
    const filePath = path.join(__dirname, '..', music.fileUrl);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await Music.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'Music deleted successfully',
    });
  } catch (error) {
    console.error('Delete music error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
