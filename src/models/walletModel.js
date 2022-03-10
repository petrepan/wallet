const mongoose = require("mongoose")
const { Schema } = mongoose

const walletSchema = new Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  balance: {
    type: Number,
    min: 0,
    default: 0,
  },
}, {
  timestamps: true,
});

const Wallet = mongoose.model("Wallet", walletSchema);

module.exports = Wallet;