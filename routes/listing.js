const express = require("express");
const router = express.Router();
const wrapAsync = require('../utils/wrapAsync');
const { listingSchema ,reviewSchema} = require('../schema');
const ExpressError = require('../utils/ExpressError');
const Listing = require('../models/listing');
const mongoose = require('mongoose');
const { isLoggedIn, isAuthor ,validateListing} = require('../middleware');
const listingController = require('../controllers/listing');
const {storage} = require('../cloudConfig.js');

const multer = require('multer');
// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + '-' + file.originalname);
//     }
// });
// const upload = multer({ storage: storage });

const upload = multer({storage});




router.route('/')
    .get(wrapAsync(listingController.index))
    // .post(isLoggedIn, validateListing, wrapAsync(listingController.createListing));
    .post(isLoggedIn,upload.array("listing[images][]", 5),validateListing, wrapAsync(listingController.createListing));



router.get('/new', isLoggedIn, listingController.renderNewForm);

router.route('/:id')
    .get(wrapAsync(listingController.showListing))
    .put(isLoggedIn,upload.array("listing[images][]", 5), validateListing,isAuthor, wrapAsync(listingController.updateListing))
    .delete(isLoggedIn,isAuthor, wrapAsync(listingController.deleteListing));

router.get("/:id/edit", isLoggedIn, isAuthor, listingController.editListing);

// router.get("/search", async (req, res) => {
//   let { q } = req.query;
//   consoel.log("Search query:", q);

//   if (!q) return res.json([]);

//   const results = await Listing.find({
//     $or: [
//       { title: { $regex: q, $options: "i" } },
//       { location: { $regex: q, $options: "i" } }
//     ]
//   }).limit(5);

//   res.json(results);
// });


module.exports = router; 








//----- Create a new listing-----
// router.get('/', wrapAsync(listingController.index));
// //-- Form to create a new listing-----
// router.get('/new', isLoggedIn, listingController.renderNewForm);
// //Create a new listing
// router.post('/',isLoggedIn, validateListing, wrapAsync(listingController.createListing));
// //Show listing details
// router.get("/:id",  wrapAsync(listingController.showListing));
// //Edit listing form
// router.get("/:id/edit", isLoggedIn, isAuthor, listingController.editListing);
// //Update listing form 
// router.put('/:id', isLoggedIn, validateListing,isAuthor, wrapAsync(listingController.updateListing));
// //Delete listing
// router.delete('/:id', isLoggedIn,isAuthor, wrapAsync(listingController.deleteListing));





// app.get('/listings/:id', wrapAsync(async (req, res,next) => {
//     //  if (!mongoose.Types.ObjectId.isValid(_id)) {
//     //     // return next(new ExpressError("Page not Found",404));
//     //     console.log("Received");
//     //     throw new ExpressError("Page not Found", 404);
//     // }

//     const listing = await Listing.findById(req.params.id);
//     console.log(listing._id);

//   const { id } = req.params;

//     if (!mongoose.Types.ObjectId.isValid(id)) {
//     throw new ExpressError("Invalid Listing ID", 400);
//     }
//     if (!listing) {
//     throw new ExpressError("Listing Not Found", 404);
//     }

//     res.send("We received your request");
// })); 
// app.get("/listings/:id", wrapAsync(async (req, res) => {
//   const { id } = req.params;

//   // 1️⃣ Invalid ObjectId format
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     throw new ExpressError("Invalid Listing ID", 400);
//   }

//   // 2️⃣ Valid ObjectId but no document found
//   const listing = await Listing.findById(id);
//   if (!listing) {
//     throw new ExpressError("Listing not found", 404);
//   }

//   // 3️⃣ Safe render
//   res.render("listings/show.ejs", { listing });
// }));
//-- Handle form submission to create a new listing-----
// app.post('/listings', wrapAsync(async (req, res,next) => {
// //     // if(!req.body.listings){
// //     //   console.log(req.body);
// //     //     return next(new ExpressError("Invalid Listing Data",400));
// //     // }
  
// //   // console.log("🔥 POST /listings HIT");
// //   // console.log(req.body);

// //   if(!req.body){
// //     return next(new ExpressError(400,"Something might be missing !"));
// //   }
// // //     const listing = new Listing({
// // //         title: req.body.title,
// // //         description: req.body.description,
// // //         price: req.body.price,
// // //         location: req.body.location,
// // //         imageUrl: req.body.imageUrl
// // //     });
// //     // console.log(req.body.listing);console.log(req.body.price);
// //     // console.log(typeof req.body.listing.title);
// //     // const newListing = await listing.save();
// //     const listingData = req.body.listing || req.body;



// //     console.log(listingData);

// //     const newListing = new Listing(listingData);
// //     await newListing.save();
// //     res.redirect(`/listings/${newListing._id}`);
//   }));


// // //   console.log(req.body);

// //     // if (!mongoose.Types.ObjectId.isValid(id)) {
// //     //     // return next(new ExpressError("Page not Found",404));
// //     //     console.log("Received");
// //     //     throw new ExpressError("Page not Found", 404);
// //     // }

// // //   }
// // // if (!req.body || Object.keys(req.body).length === 0) {
// // // //   return res.status(400).send("req.body is empty");
// // //     throw new ExpressError("Page not Found", 404);      
// // // }

    
// //     // const listing = await Listing.findById(req.params.id);

// //     // res.render('listings/show.ejs', { listing: listing });

// //     res.send("We received your request"); 
   
// // }));
































