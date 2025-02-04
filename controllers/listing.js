const Listing = require("../models/listing.js");



module.exports.index = async(req,res,next)=>{
    let allListings =await  Listing.find();
    res.render("listings/index.ejs",{allListings});
    
}






module.exports.new = (req,res)=>{
    res.render("listings/new.ejs");
}







module.exports.show = async(req,res,next)=>{
    let {id} = req.params;
    let individualListings = await Listing.findById(id)
    .populate({
        path:"review",
        populate : {
            path : "author",
        },
    }).populate("owner");


    if(!individualListings){
       req.flash("error", "listing you are trying to access does not exist");  
       res.redirect("/listings");
    }
    console.log(individualListings);
    res.render("listings/show.ejs",{individualListings});
}








module.exports.create = async(req,res,next)=>{
 
    let newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    await newListing.save();
    req.flash("success","new listing created");
    res.redirect("/listings");
     
 }








 module.exports.edit = async(req,res,next)=>{
    let {id} = req.params;
    let individualListings = await Listing.findById(id);

    if(!individualListings){
        req.flash("error","listing you requested does not exist");
        res.redirect("/listings");
     }

    res.render("listings/edit.ejs",{individualListings});
}









module.exports.update = async (req,res)=>{
   
    let{id} = req.params;
     await Listing.findByIdAndUpdate(id,{...req.body.listing})
     req.flash("success", " listing updated successfully")
     res.redirect(`/listings/${id}`);
}






module.exports.destroy = async (req,res)=>{
    let {id} = req.params;
    let deletedListing = await Listing.findByIdAndDelete(id)
    console.log(deletedListing);
    req.flash("success","listing deleted successfully");
    
    res.redirect("/listings");
}