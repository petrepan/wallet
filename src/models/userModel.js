const mongoose = require("mongoose");
const Wallet = require("./walletModel");
const { Schema } = mongoose

const userSchema = new Schema({
  firstName: {
    type: String,
    maxlength: 128,
    trim: true,
  },
  lastName: {
    type: String,
    maxlength: 128,
    trim: true,
  },
  email: {
    type: String,
    match: /^\S+@\S+\.\S+$/,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 128,
  },
}, {
  timestamps: true,
});

userSchema.pre('save', async function save(next) {
  try {
    const wallet = new Wallet({user: this._id})
    await wallet.save()
    return next();
  } catch (error) {
    return next(error);
  }
});


const User = mongoose.model("User", userSchema);

module.exports = User;