const express = require('express');
const router = express.Router({ mergeParams: true });
const wrapAsync = require('../utils/wrapAsync');
const { listingSchema,reviewSchema } = require('../schema');
const ExpressError = require('../utils/ExpressError');
const Review = require('../models/review');
const Listing = require('../models/listing');
const { isLoggedIn ,validateReview } = require('../middleware');
const reviewController = require('../controllers/review');




// Review (Post Route)
router.post('/',isLoggedIn,validateReview, wrapAsync(reviewController.createReview));
//Review Delete
router.delete("/:reviewId",wrapAsync(reviewController.deleteReview));

module.exports = router;