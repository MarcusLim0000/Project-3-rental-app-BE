const Listing = require("../models/listing.model.js");

async function createListing(req, res) {
  try {
    const listing = await Listing.create(req.body);
    return res.status(200).json(listing);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

// To add in deleteListing function, updateListing, getListing

module.exports = { createListing };
