const express = require('express')
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const flash =require('connect-flash')
const session = require("express-session");

const ejsMate = require("ejs-mate")
const methodOverride = require("method-override")
const port = 3000;
const passport =require("passport");
const LocalStrategy =require("passport-local");
const User =require("./models/User");

// mongoose.connect("mongodb://127.0.0.1:27017/ecomm-careerbootcamp")
// .then(()=> console.log("db connected sucessfully"))
// .catch((err)=> console.log(err));
mongoose.connect("mongodb+srv://vikashkumargupta082:Rlz2sLaVGnpsY4tx@shoppercart.ssjpg66.mongodb.net/?retryWrites=true&w=majority&appName=shopperCart")
.then(()=>console.log("db connected sucessfully")).catch((err)=>console.log(err))

const sessionConfig ={
 
  secret: 'thisisVeryspecailsessions',
  resave: false,
  saveUninitialized: true,

}
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Routes
  const productRoutes = require("./routes/productRoutes")
  const reviewRoutes =require("./routes/reviewRoutes");
  const authRoutes =require("./routes/authRoutes");
  const cartRoutes = require("./routes/cartRoutes");

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"))
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"))

app.use(session(sessionConfig));
app.use(passport.authenticate('session'));
app.use(flash());

app.use((req,res,next)=>{
   res.locals.success =req.flash("success");
   res.locals.error =req.flash("error");
   res.locals.currentUser =req.user
   next();
})

//routes middleware
app.use(cartRoutes);
app.use("" ,productRoutes)
app.use(reviewRoutes)
app.use(authRoutes);

app.get("/", (req,res)=>{

  res.render("homepage")
  })

app.listen(port, () => console.log(`Server listening at http://localhost:3000`))
