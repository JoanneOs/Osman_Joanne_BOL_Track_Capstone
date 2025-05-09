const mongoose = require('mongoose');

const bolSchema = new mongoose.Schema({
  loadNumber: { type: String, required: true, unique: true },
  date: { type: Date, default: Date.now },
  shipper: { type: String, required: true },
  consignee: { type: String, required: true },
  rate: { type: Number, required: true },
  miles: { type: Number },
  status: { type: String, enum: ['Pending', 'Paid', 'Disputed'], default: 'Pending' }
});

module.exports = mongoose.model('Bol', bolSchema);