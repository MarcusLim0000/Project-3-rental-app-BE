const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.models");
const Listing = require("../models/listing.model");

async function create(req, res) {
  try {
    // Add the user to the db
    const user = await User.create(req.body);
    // token will be a string
    const token = createJWT(user);
    // Yes, we can serialize a string
    res.json(token);
  } catch (err) {
    // Probably a dup email
    res.status(400).json(err);
  }
}

async function signIn(req, res) {
  try {
    // Find the user by their email address
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
    // Check if the password matches
    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) throw new Error();
    res.json(createJWT(user));
  } catch {
    res.status(400).json("Bad Credentials");
  }
}

async function getUserListings(req, res) {
  if (req.user.id === req.params.id) {
    try {
      const listings = await Listing.find({
        userRef: req.params.id
      });
      res.status(200).json(listings);
      
    } catch {
      res.status(401).json("You can only view your own listings");
    }
  }
}

// To add updateUser, deleteUser, getUserListing

/*-- Helper Functions --*/

function createJWT(user) {
  return jwt.sign(
    // data payload
    { user },
    process.env.SECRET,
    { expiresIn: "24h" }
  );
}

module.exports = {
  create,
  signIn,
  getUserListings,
};
