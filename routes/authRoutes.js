const express = require("express");
const router = express.Router();
const User =require("../models/User");
const passport = require("passport");

router.get("/register",(req,res)=>{
    res.render("auth/Signup");
})

// router.get("/testUser", async(req,res)=>{

//     const user = new User({username : " naman" , email : "naman@gmail.com" })

//        const newUser = await User.register(user , "12345");

//        res.send(newUser)


// })

//register a new user

router.post("/register",async (req,res)=>{
    const {username ,password,email} =req.body;
    console.log("gvgjvg")

    console.log(req.body);

    const user = new User({username,email});
    const newUser = await User.register(user,password);
    req.flash("success","user registered successfully!")
    res.redirect("/login")
})

router.get("/login" ,(req,res)=>{
    res.render("auth/Login")
})

router.post("/login",
passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
    failureMessage:true
}),
function(req,res){
    req.flash("success",`welcome back ${req.user.username}`);
    res.redirect("/products")
}

)

router.get("/logout",(req,res)=>{
    req.logout((err)=>{
        if(err){return next(err)};
        req.flash("success","goodbye see you again!");
        res.redirect("/login")
    })
})



module.exports =router;