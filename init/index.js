const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js");


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

main()
.then((result)=>{
    console.log(result);

})
.catch((err)=>{
    console.log(err);
})


const initDb = async()=>{
    await Listing.deleteMany({});
     initdata.data = initdata.data.map((obj)=>({...obj, owner : '679223fea8d24a5262c1a4b4' }));
    await Listing.insertMany(initdata.data);
    console.log("data was initialized");
}

initDb();