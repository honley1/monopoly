const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  index: { type: Number, required: true },
  name: { type: String, required: true },
  type: {
    type: String,
    enum: ['property', 'tax', 'chance', 'go', 'jail', 'free', 'go-to-jail'],
    default: 'property'
  },
  cost: { type: Number, default: 0 },
  rent: { type: Number, default: 0 },
  color: { type: String }
});

module.exports = mongoose.model('Property', propertySchema);
