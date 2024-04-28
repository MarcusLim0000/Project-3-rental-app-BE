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

async function getListings(req, res) {
  try {
    const listings = await Listing.find({});
    return res.status(200).json(listings);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

//get only 1 listing
async function getListing(req, res) {
  try {
    const listing = await Listing.findById(req.params.id);
    return res.status(200).json(listing);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

async function deleteListing(req, res) {
  try {
  await Listing.findByIdAndDelete(req.params.id);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

async function updateListing(req, res) {
  try {
  await Listing.findByIdAndUpdate(
    req.params.id, 
    req.body,
    { new: true }
    );
    res.status(200).json('updatedListing');
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}


// I can't create new listings via postman tho, think i need to be "logged in" as a user first?
// To add in deleteListing function, updateListing, getListing

module.exports = { createListing, getListings, getListing, deleteListing, updateListing,  };
