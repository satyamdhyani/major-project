const express = require('express');
const router = express.Router({mergeParams:true});
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");

const Review = require("../models/review.js");
const {validateReview,isLoggedIn,isReviewAuthor} = require("../middleware.js");




const reviewControllers = require("../controllers/review.js");












// for review 
// add review 


router.post("/",isLoggedIn,validateReview,wrapAsync(reviewControllers.addReview));





// delete review `
router.delete("/:reviewId", isLoggedIn,isReviewAuthor,wrapAsync(reviewControllers.destroyReview));



module.exports = router;
    









