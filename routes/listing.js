const express = require('express');
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {isLoggedIn,isOwner,validateListing}  = require("../middleware.js");


const listingController = require("../controllers/listing.js");









// index route


router.get("/", wrapAsync(listingController.index));





// new route
router.get("/new", isLoggedIn, listingController.new);







// show route
router.get("/:id", wrapAsync(listingController.show));




// create route

router.post("/",isLoggedIn,validateListing,wrapAsync(listingController.create));




// edit route

router.get("/:id/edit",isLoggedIn,isOwner, wrapAsync(listingController.edit));



// update route

router.put("/:id", isLoggedIn, isOwner,validateListing, wrapAsync(listingController.update));


// Delete route

router.delete("/:id",isLoggedIn, isOwner,wrapAsync(listingController.destroy));



module.exports = router;