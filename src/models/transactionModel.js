const mongoose = require('mongoose');
const crypto = require('crypto');
/**
* Indicates type of operation
*/
const type = ['deposit', 'transfer'];

/**
 * Transaction Schema
 * @private
 */
const transactionSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: type,
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  destination: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  reference: {
    type: String,
  },
}, {
  timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);
  
module.exports = Transaction;