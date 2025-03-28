const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  ticket: { type: mongoose.Schema.Types.ObjectId, ref: 'Ticket', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Notification', notificationSchema);