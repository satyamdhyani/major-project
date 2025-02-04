
require('dotenv').config();


const express = require('express');
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const expressError = require("./utils/expressError.js");
const {listingSchema,reviewSchema} = require("./schema.js");
const Review = require("./models/review.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require('./models/user.js');






const listingsRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");


const dbUrl = process.env.ATLASDB_URL;





app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine("ejs",ejsMate);
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.json());

const store = MongoStore.create({
    mongoUrl: dbUrl,
    crypto :{
        secret: process.env.SECRET,
    },
    touchAfter: 24 * 3600,
});


store.on("error",(err)=>{
    console.log("Error in mongo session store",err);
})

app.use(session({
    store,
    secret : process.env.SECRET,
    resave : false,
    saveUninitialized : true,
    cookie : {
        expires : Date.now() + 7*24*60*60*1000,
        maxAge : 7*24*60*60*1000,
        httpOnly : true
    }

}));



app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());





 async function main(){
    await mongoose.connect(dbUrl);

}


main()
.then((result)=>{
    console.log(result);
})
.catch((err)=>{
    console.log(err);
})





let port = 8080;
app.listen(port,()=>{
    console.log(`app is listening on port${port}`);
    
})














app.use((req,res,next)=>{
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    res.locals.currUser = req.user;
    next();
});










app.use("/listings",listingsRouter);
app.use("/listings/:id/review",reviewRouter);
app.use("/", userRouter);










// handling request for unmatched route
app.all('*',(req,res,next)=>{
    next(new expressError(404,"Page not found"));
});



// error handling for add new listing

app.use((err,req,res,next)=>{
    let {statusCode =500, message= "something went wrong"} = err;
res.render("listings/error.ejs",{message});
    
});





