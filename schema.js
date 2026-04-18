const Joi = require('joi');
//-- Schema for validating new listing data----
const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().required().min(0),
        location: Joi.string().required(),
        category: Joi.array().items(Joi.string()).required(),
        // images: Joi.array()
        //     .items(Joi.string().allow("").optional())
        //     .default(["/images/default.jpeg"])
        images: Joi.array()
            .items(Joi.string().allow(""))
            .default(["/images/default.jpeg"])
    }).required(),
    deleteImages: Joi.array() // For handling image deletions in edit form
});


const reviewSchema = Joi.object({
    review: Joi.object({
        comment: Joi.string().required(),
        rating: Joi.number().min(1).max(5).required()
    }).required()
});


module.exports.listingSchema = listingSchema;
module.exports.reviewSchema = reviewSchema;