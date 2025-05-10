const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  url: String
});

module.exports = mongoose.model('Image', imageSchema);
