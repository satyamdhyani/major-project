const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");



const userController = require("../controllers/users.js");








router.get("/signup",userController.signupForm);





router.post("/signup",wrapAsync(userController.signUp));




router.get("/login",userController.loginForm);




router.post("/login",saveRedirectUrl,passport.authenticate("local",{failureRedirect: "/login", failureflash: true}),userController.login);






router.get("/logout",userController.logout);






module.exports = router;