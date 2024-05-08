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

async function getListingsById(req, res) {
  try {
    console.log(req.params)
const listing = await Listing.find({_id: req.params.id})
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

async function deleteListing(req, res) {
  try {
    const { id } = req.params;
  const deletedListing = await Listing.findByIdAndDelete(id);
  if (!deletedListing) {
    return res.status(404).json({ error: 'Listing not found' });
  }
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
    res.status(200).json(updatedListing);
    
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}

async function updateAvailability(req, res) {
  try {
    const { id } = req.params;
    const { availability } = req.body;  

    const updatedListing = await Listing.findByIdAndUpdate(
      id,
      { availability },
      { new: true }
    );

    if (!updatedListing) {
      return res.status(404).json({ error: 'Listing not found' });
    }

    res.status(200).json(updatedListing);
  } catch (error) {
    console.error('Error updating listing:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}



const getAvailableListings = async (req, res) => {
  try {
    const listings = await Listing.find({ availability: true });
    res.status(200).json(listings);
  } catch (error) {
    console.error("Error getting available listings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports = { createListing, getUserListings, getListings, deleteListing, updateListing, updateAvailability, getAvailableListings, getListingsById };
