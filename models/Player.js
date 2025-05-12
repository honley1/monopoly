const mongoose = require('mongoose');

const playerSchema = new mongoose.Schema({
  socketId: { type: String },
  name: { type: String, required: true },
  roomCode: { type: String, required: true },
  balance: { type: Number, default: 1500 },
  position: { type: Number, default: 0 },
  properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }],
  isBot: { type: Boolean, default: false },
  userId: { type: String, required: true },
  isOnline: { type: Boolean, default: true },
  bankrupt: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Player', playerSchema);
