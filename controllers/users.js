const User = require("../models/user.js");


module.exports.signupForm = (req,res)=>{
    res.render("./user/signup.ejs");
}









module.exports.signUp = async(req,res)=>{
    try{
    let {email,username,password} = req.body;
    let signupUser = new User({
        email : email,
        username : username,
    });

   let registeredUser = await User.register(signupUser,password);
   console.log(registeredUser);
   req.login(registeredUser,(err)=>{
    if(err){
        return next(err);
    }

    req.flash("success","welcome to wanderlust");
    res.redirect("/listings");
   })
}catch(e){
    req.flash("error",e.message);
    res.redirect("/signup");
}

}








module.exports.loginForm = (req,res)=>{
    res.render("./user/login.ejs");
}







module.exports.login = async(req,res)=>{
    req.flash("success","welcome back to wanderlust");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);

}






module.exports.logout = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","you are logged out");
        res.redirect("/listings");
    })
}




