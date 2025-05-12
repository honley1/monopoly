const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player' }],
  started: { type: Boolean, default: false },
  turnIndex: { type: Number, default: 0 },
  logs: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Room', roomSchema);
