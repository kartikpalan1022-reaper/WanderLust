const  Listing  = require('./models/listing');
const ExpressError = require('./utils/ExpressError');
const { listingSchema ,reviewSchema} = require('./schema');
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });



module.exports.isLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        req.session.redirectTo = req.originalUrl; // Store the original URL they were trying to access
        req.flash('error',"You must be signed in first!");
        return res.redirect('/login');
    }
    next();
};


module.exports.isAuthor = async (req, res, next) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing.owner.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/listings/${id}`);
    }
    next();
};

module.exports.saveRedirectTo = (req, res, next) => {
    if(req.session.redirectTo) {
        res.locals.redirectTo = req.session.redirectTo;
    }
    next();
};

module.exports. validateListing = (req, res, next) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    throw new ExpressError(400, "Request body is empty");
  }

  if (!req.body.listing) {
    req.body = { listing: req.body };
  }

  const { error } = listingSchema.validate(req.body);
  console.log(error);

  if (error) {
    const msg = error.details.map(el => el.message).join(', ');
    throw new ExpressError(400, msg);
  }

  next();
};


module.exports.validateReview = (req, res, next) => {
      if (!req.body || Object.keys(req.body).length === 0) {
        throw new ExpressError(400, "Request body is empty");
      }
    
      if (!req.body.review) {
        req.body = { review: req.body };
      }
    
      const { error } = reviewSchema.validate(req.body);
      console.log(error);
    
      if (error) {
        const msg = error.details.map(el => el.message).join(', ');
        throw new ExpressError(400, msg);
      }
    
      next();
    };
  


