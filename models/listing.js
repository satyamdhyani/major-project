const mongoose = require("mongoose");
const {Schema} = mongoose;
const Review = require("./review.js");
const User = require("./user.js");
const { string } = require("joi");

const listingSchema =  new mongoose.Schema({
    title:{
        type : String,
        
    },
    description : {
        type : String,
    },
    image : {
        type : String,
        
        default: "",
        set : (v)=> v === "" ? "" : v,
    },
    price : {
        type : String,
    },
    location : {
        type : String,

    },
    country : {
        type : String
    },

    review : [
    {
        type : Schema.Types.ObjectId,
        ref : "Review",

    },
    ],

    owner : {
        type : Schema.Types.ObjectId,
        ref : "User",
    },

  


})



listingSchema.post("findOneAndDelete",async(data)=>{
    if(data){
        await Review.deleteMany({_id: {$in : data.review}})
    }

});


const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;


