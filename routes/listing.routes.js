const express = require("express");
const router = express.Router();
const listingCtrl = require("../controllers/listing.controllers"); 

router.post("/create", listingCtrl.createListing);  
//http://localhost:3005/api/listing/create

router.get("/get", listingCtrl.getListings); 
http://localhost:3005/api/listing/get

router.get("/get/:id", listingCtrl.getListing); 
http://localhost:3005/api/listing/get/id

router.delete('/delete/:id', listingCtrl.deleteListing);
//http://localhost:3005/api/listing/delete/id

router.post('/update/:id', listingCtrl.updateListing);
//http://localhost:3005/api/listing/update/id

module.exports = router;
