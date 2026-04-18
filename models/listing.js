const  mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review');

const listingSchema = new Schema({
    title: { 
        type: String, required: true
    },
    description: { 
        type: String, required: true
    },
    price: { 
        type: Number, required: true
    },
    location: { 
        type: String, required: true
    },
   
   images: {
        type: [
            {
            url: String,
          
            }
        ],
        default: [
            {
            url: "/images/default.jpg",
        
       
            }
        ]
    },
    createdAt: { 
        type: Date, 
        default: Date.now 
    },
    review:[
        {
            type: Schema.Types.ObjectId,
            ref:"Review"
        }
    ],
    owner:{
        type: Schema.Types.ObjectId,
        ref:"User"
    },
    geometry:{
        type:{
            type:String,
            enum:["Point"],
            required:true
        },
        coordinates:{
            type:[Number],
            required:true
        }
    },
    category:{
        type:[String],
        enum:["villas","cottage","rooms","resorts","hotel","arctic","camping","city","forest","beach","mountains","trending"],
        required:true
    }
});
listingSchema.post("findOneAndDelete", async function(listing){
    if(listing){
        await Review.deleteMany({
            _id:{$in: listing.reviews} 
        })

}});

const Listing = mongoose.model('Listing', listingSchema);
module.exports = Listing;