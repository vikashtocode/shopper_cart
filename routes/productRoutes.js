const express = require("express");
const router =  express.Router();
const Product = require("../models/Product");
const {isLoggedIn} =require("../middleware")

// get all the products

router.get("/products", async(req,res)=>{

    const products =  await Product.find({});
    // console.log(products)
   

    res.render("products/index",{products})
})

// get form to create new product

router.get("/products/new",isLoggedIn,(req,res)=>{

    res.render("products/new")

})

// create a new product

router.post("/products",isLoggedIn,async(req,res)=>{

    const {name, img, price, desc} = req.body;

     await Product.create({name, price, desc, img});

       req.flash("success","Product added sueccessfully!")

     res.redirect("/products")
})

//show product route

router.get("/products/:productid",async(req,res)=>{

    const {productid} = req.params;

      const product = await Product.findById(productid).populate("reviews");
       
    

      res.render("products/show", {product})

})

// get edit form

router.get("/products/:productid/edit",isLoggedIn,async(req,res)=>{

    const {productid} = req.params;

    const product = await Product.findById(productid);

      res.render("products/edit", {product})
})

router.patch("/products/:productid",isLoggedIn,async(req,res)=>{

     const {productid} = req.params;

     const {name,img,price, desc} =req.body;

     await Product.findByIdAndUpdate(productid, {name, price, img, desc});
       
      req.flash("success","product has been updated successfully")

    
      res.redirect(`/products/${productid}`)
})


router.delete("/products/:productid",isLoggedIn, async(req,res)=>{

    const {productid} = req.params;

    await Product.findByIdAndDelete(productid);
    req.flash("error","product has benn deleted")
    res.redirect("/products")
})









module.exports = router
