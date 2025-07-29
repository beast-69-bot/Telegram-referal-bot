const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  telegramId: { type: String, required: true, unique: true },
  referrals: { type: Number, default: 0 },
  points: { type: Number, default: 0 },
  referredBy: { type: String, default: null }
});

module.exports = mongoose.model('User', userSchema);