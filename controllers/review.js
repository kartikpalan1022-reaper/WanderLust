const Review = require('../models/review');
const Listing = require('../models/listing');
const ExpressError = require('../utils/ExpressError');

module.exports.createReview = async(req,res,next)=>{
    const listing = await Listing.findById(req.params.id);
    if(!listing){
        return next(new ExpressError("Listing not found",404));
    }

   
    const reviewListing = await Review(req.body.review);
   

    reviewListing.createdBy = req.user._id;
     console.log(reviewListing);

    listing.review.push(reviewListing);
    await reviewListing.save();
    await listing.save();
    // res.redirect(`/listings/${listing._id}`);

    req.flash('success', 'Review added successfully!');
    res.redirect(`/listings/${listing._id}`);
}

module.exports.deleteReview = async(req,res,next)=>{
  let {id,reviewId} = req.params;
  await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}});
  await Review.findByIdAndDelete(reviewId);
  req.flash('success', 'Review deleted successfully!');
  res.redirect(`/listings/${id}`);
}