const express = require("express");
const router = express.Router();
const { createListing } = require("../controllers/listing.controllers"); 

router.post("/create", createListing);  

module.exports = router;
