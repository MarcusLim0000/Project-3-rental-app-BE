const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user.models");
const Listing = require("../models/listing.model");

async function create (req, res) {
  try {
    const newUserDetails = req.body;
    const newUser = await User.create(newUserDetails);
    return res.status(201).json(newUser)
  } catch (error) {
    console.log(error);
    return res.status(500).json({error: error.message})
  }
}

async function signIn(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) throw new Error();
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


function createJWT(user) {
  return jwt.sign(
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
