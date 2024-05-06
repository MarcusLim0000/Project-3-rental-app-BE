const Listing = require("../models/listing.model.js");

async function createListing(req, res) {
  try {
    const listing = await Listing.create({
      ...req.body,
      createdBy: req.user._id});
    return res.status(200).json(listing);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

async function getUserListings(req, res) {
  try {
    const listings = await Listing.find({createdBy: req.user._id});
    return res.status(200).json(listings);
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

async function deleteListing(req, res) {
  try {
    const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    return res.status(404).json({ error: 'Listing not found' });
  }
console.log(deleteListing, "Listing deleted");
  res.json({ message: 'Listing deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

async function updateListing(req, res) {
  try {
    const { id } = req.params;
  const updatedListing = await Listing.findByIdAndUpdate(
    id.trim(), 
    req.body,
    { new: true }
    );
    console.log(updatedListing, "Updated Listing");
    res.status(200).json(updatedListing);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}


// I can't create new listings via postman tho, think i need to be "logged in" as a user first?
// To add in deleteListing function, updateListing, getListing

module.exports = { createListing, getUserListings, getListings, deleteListing, updateListing,  };
