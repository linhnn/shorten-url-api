const mongoose = require('mongoose');

const SubscribeSchema = new mongoose.Schema({
  email: String,
}, { timestamps: true });

module.exports = mongoose.model('Subscribe', SubscribeSchema);
