const Listing = require("../models/listing.js");
const Review = require("../models/review.js");




module.exports.addReview = async(req,res)=>{
    let listing = await Listing.findById(req.params.id);
 
    let newReview = new Review(req.body.review);
    newReview.author = req.user._id;
 
 
  listing.review.push(newReview);
 
 
    await listing.save();
    await newReview.save();
 
    req.flash("success","review added successfully");
 
    
 
    res.redirect(`/listings/${listing._id}`);
 }








 module.exports.destroyReview = async (req, res) => {
     const { id, reviewId } = req.params;
     await Listing.findByIdAndUpdate(id, { $pull: { review: reviewId } });
     await Review.findByIdAndDelete(reviewId);
 
     req.flash("success","review deleted successfully");
     res.redirect(`/listings/${id}`);
 }