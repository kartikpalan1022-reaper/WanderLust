const Listing = require('../models/listing');
const ExpressError = require('../utils/ExpressError');
const mongoose = require('mongoose');
const cloudinary = require("cloudinary").v2;
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient  = mbxGeocoding({ accessToken: mapToken });


module.exports.index = async (req, res) => {
  let { category } = req.query;

  let listings;

  if (category) {
    listings = await Listing.find({
      category: { $in: [category.toLowerCase()] }
    });
  } else {
    listings = await Listing.find({});
  }

  res.render("listings/index", { listings, category });
};


module.exports.renderNewForm = (req, res) => {
    res.render('listings/new.ejs');
}

module.exports.createListing = async (req, res) => {

  let response = await geocodingClient.forwardGeocode({
    query: req.body.listing.location,
    limit: 1
  }).send();

  const match = response.body.features[0];
  if (!match) {
    req.flash('error', 'Invalid location!');
    return res.redirect('/listings/new');
  }

  // 🔥 FIX: convert category to lowercase (IMPORTANT)
  let category = req.body.listing.category;

  if (category) {
    if (Array.isArray(category)) {
      category = category.map(c => c.toLowerCase());  // ✅ FIXED
    } else {
      category = category.toLowerCase();              // ✅ FIXED
    }
  }

  const newListing = new Listing({
    ...req.body.listing,
    category
  });

  console.log("FILES:", req.files);

  if (req.files && req.files.length > 0) {
    newListing.images = req.files.map(file => ({
      url: file.path,
      filename: file.filename
    }));
  } else {
    newListing.images = [
      {
        url: "/images/default.jpeg"
      }
    ];
  }

  newListing.owner = req.user._id;
  newListing.geometry = match.geometry;

  let n = await newListing.save();
  
  console.log(n);
  req.flash('success', 'New listing created!');
  res.redirect(`/listings/${newListing._id}`);
};
module.exports.showListing = async (req, res, next) => {
    const { id } = req.params;
    
  
    // 1️⃣ Not even hex → Page Not Found
    if (!/^[0-9a-fA-F]+$/.test(id)) {
      return next(new ExpressError("Page Not Found", 404));
    }
  
    // 2️⃣ Hex but wrong length → Invalid Listing ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      // return next(new ExpressError("Invalid Listing ID", 400));
      req.flash('error', 'Invalid Listing ID!');
      return res.redirect('/listings'); 
    }
  
    // 3️⃣ Valid ObjectId but not in DB
    const listing = await Listing.findById(id).populate({path:"review",populate:{path:"createdBy"}}).populate("owner");
    if (!listing) {
      // return next(new ExpressError("Listing not found", 404));
      req.flash('error', 'Listing not found!');
      
      return res.redirect('/listings');
    }
    console.log("IMAGES DATA:", listing.images);
    // 4️⃣ Success
    res.render("listings/show.ejs", { listing });
}
 
module.exports.editListing =  async (req, res, next) => {

  const { id } = req.params;

  // 1️⃣ Not hex
  if (!/^[0-9a-fA-F]+$/.test(id)) {
    return next(new ExpressError("Page Not Found", 404));
  }

  // 2️⃣ Invalid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    req.flash("error", "Invalid Listing ID!");
    return res.redirect("/listings");
  }

  const listing = await Listing.findById(id);

  // 3️⃣ Not found in DB
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }

  // 4️⃣ Fix empty images
  if (
    !listing.images ||
    listing.images.length === 0 ||
    listing.images.every(img => img === "")
  ) {
    listing.images = ["/images/default.jpeg"];
  }
 

  res.render("listings/edit", { listing });

}

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  // 🔥 1. HANDLE CATEGORY (MOST IMPORTANT)
  let category = req.body.listing.category;

  if (category) {
    if (Array.isArray(category)) {
      category = category.map(c => c.toLowerCase());
    } else {
      category = [category.toLowerCase()];
    }
  }

  // 👉 2. Get listing first
  let listing = await Listing.findById(id);

  // 👉 3. Update basic fields + category
  listing.set({
    ...req.body.listing,
    category
  });

  // 👉 DEBUG
  console.log("DELETE IMAGES:", req.body.deleteImages);

  // 👉 4. ADD NEW IMAGES
  if (req.files && req.files.length > 0) {
    const newImages = req.files.map(file => ({
      url: file.path,
      filename: file.filename
    }));
    listing.images.push(...newImages);
  }

  // 👉 5. DELETE IMAGES
  let deleteImages = req.body.deleteImages || [];

  if (!Array.isArray(deleteImages)) {
    deleteImages = [deleteImages];
  }

  // 👉 Cloudinary delete
  for (let item of deleteImages) {
    if (item && item.startsWith("http")) {
      const publicId = item.split("/").slice(-1)[0].split(".")[0];
      await cloudinary.uploader.destroy(`wanderlust/${publicId}`);
    }
  }

  // 👉 DB delete
  listing.images = listing.images.filter(
    img => !deleteImages.includes(img.url)
  );

  // 👉 Default image fallback
  if (listing.images.length === 0) {
    listing.images = [{ url: "/images/default.jpeg" }];
  }

  // 👉 6. UPDATE LOCATION → GEOMETRY
  const { location } = req.body.listing;

  const geoData = await geocodingClient.forwardGeocode({
    query: location,
    limit: 1,
  }).send();

  if (!geoData.body.features.length) {
    req.flash("error", "Invalid location");
    return res.redirect(`/listings/${id}/edit`);
  }

  listing.geometry = geoData.body.features[0].geometry;

  // 👉 7. SAVE ONCE (IMPORTANT)
  await listing.save();

  req.flash("success", "Updated your listing!");
  res.redirect(`/listings/${id}`);
};

module.exports.deleteListing = async (req, res) => {
    
        await Listing.findByIdAndDelete(req.params.id); 
        req.flash('success', 'Listing has been deleted!');
        res.redirect('/listings');
}

