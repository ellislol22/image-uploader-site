const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Image = require('../models/Image');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({ cloudinary, params: { folder: 'uploads' } });
const upload = multer({ storage });
const router = express.Router();

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch {
    res.status(401).json({ msg: 'Unauthorized' });
  }
};

router.post('/', auth, upload.single('image'), async (req, res) => {
  const image = await Image.create({ userId: req.user._id, url: req.file.path });
  res.json(image);
});

router.get('/all', async (req, res) => {
  const images = await Image.find().populate('userId', 'email');
  res.json(images);
});

module.exports = router;
