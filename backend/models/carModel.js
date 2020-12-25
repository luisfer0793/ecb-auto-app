const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
  km: {
    type: Number,
    required: true
  },
  make: {
    type: String,
    required: true
  },
  model: {
    type: String,
    required: true
  },
  estimateDate: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  underMaintenance: {
    type: Boolean,
    required: true
  },
  image: {
    type: String,
    required: true
  },
}, {timestamps: true});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;