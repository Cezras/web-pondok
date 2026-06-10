import express from 'express';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import News from '../models/News.js';

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', 'uploads', 'news');
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
    cb(null, 'news-' + uniqueSuffix + path.extname(file.originalname));
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

// @route   GET /api/news
// @desc    Get all news
// @access  Public
router.get('/', async (req, res) => {
  try {
    const news = await News.find({ published: true }).sort({ createdAt: -1 });
    res.json({ success: true, data: news });
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/news/all
// @desc    Get all news (including unpublished, for admin)
// @access  Private (Admin)
router.get('/all', async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json({ success: true, data: news });
  } catch (error) {
    console.error('Get all news error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/news/:id
// @desc    Get single news
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }
    res.json({ success: true, data: news });
  } catch (error) {
    console.error('Get news error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/news
// @desc    Create new news
// @access  Private (Admin)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, content, published } = req.body;
    
    const newsData = {
      title,
      content,
      published: published === 'true' || published === true,
    };

    if (req.file) {
      newsData.imageUrl = `/uploads/news/${req.file.filename}`;
    }

    const news = new News(newsData);
    await news.save();

    res.status(201).json({
      success: true,
      data: news,
      message: 'News created successfully',
    });
  } catch (error) {
    console.error('Create news error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   PUT /api/news/:id
// @desc    Update news
// @access  Private (Admin)
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { title, content, published } = req.body;
    
    let news = await News.findById(req.params.id);
    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }

    news.title = title || news.title;
    news.content = content || news.content;
    news.published = published !== undefined ? (published === 'true' || published === true) : news.published;

    if (req.file) {
      // Delete old image
      if (news.imageUrl) {
        const oldFilePath = path.join(__dirname, '..', news.imageUrl);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      }
      news.imageUrl = `/uploads/news/${req.file.filename}`;
    }

    await news.save();

    res.json({
      success: true,
      data: news,
      message: 'News updated successfully',
    });
  } catch (error) {
    console.error('Update news error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/news/:id
// @desc    Delete news
// @access  Private (Admin)
router.delete('/:id', async (req, res) => {
  try {
    const news = await News.findById(req.params.id);
    
    if (!news) {
      return res.status(404).json({ success: false, message: 'News not found' });
    }

    // Delete image from filesystem
    if (news.imageUrl) {
      const filePath = path.join(__dirname, '..', news.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await News.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: 'News deleted successfully',
    });
  } catch (error) {
    console.error('Delete news error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
