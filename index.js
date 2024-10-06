
const express = require('express');
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const flash = require('connect-flash');
const session = require("express-session");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/User");
require("dotenv").config()

const PORT = process.env.PORT||3000;
const uri = process.env.MONGODB_URL;

// Connection options
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 30000, // Increase timeout to 30 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
};

// Connect to MongoDB with retry logic
const connectWithRetry = () => {
  console.log('MongoDB connection with retry');
  mongoose.connect(uri, options).then(() => {
    console.log('MongoDB is connected');
  }).catch(err => {
    console.log('MongoDB connection unsuccessful, retry after 5 seconds. ', err);
    setTimeout(connectWithRetry, 5000);
  });
};

connectWithRetry();

// Enable Mongoose debugging
mongoose.set('debug', true);

// Passport configuration
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const sessionConfig = {
  secret: 'thisisVeryspecailsessions',
  resave: false,
  saveUninitialized: true,
};

app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.use(session(sessionConfig));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user;
  next();
});

// Routes
const productRoutes = require("./routes/productRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const authRoutes = require("./routes/authRoutes");
const cartRoutes = require("./routes/cartRoutes");

app.use(cartRoutes);
app.use("", productRoutes);
app.use(reviewRoutes);
app.use(authRoutes);

app.get("/", (req, res) => {
  res.render("homepage");
});

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));


