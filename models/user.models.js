const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const SALT_ROUNDS = 6;

const userSchema = new Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    trim: true,
    minlength: 3,
    required: true
  }
}, {
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      delete ret.password;
      return ret;
    }
  }
});

userSchema.pre('save', async function(next) {
  // 'this' is the user doc
  if (!this.isModified('password')) return next();
  // the password is either new, or being updated
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
});

const houseSchema = new Schema ({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  bedrooms: {
    type: Number,
    required: true
  },
  bathrooms: {
    type: Number,
    required: true
  },
  size: {
    type: Number,
    required: true
  },
  amenities: [String],
  images: [],
  available: {
    type: Boolean,
    default: true
  }
},{
  timestamps: true
})

module.exports = mongoose.model('User', userSchema);