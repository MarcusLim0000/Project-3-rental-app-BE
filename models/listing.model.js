const mongoose = require("mongoose");
const User = require('./user.models');

const listingSchema = mongoose.Schema(
  
  {
    title: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    images: {
      type: Array,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
