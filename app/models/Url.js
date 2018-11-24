const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
  originalUrl: String,
  urlCode: String,
  shortUrl: String,
  count: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Url', UrlSchema);
