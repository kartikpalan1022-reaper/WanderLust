const mongoose = require("mongoose");
const schema = mongoose.Schema; 
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});
UserSchema.plugin(passportLocalMongoose.default); // This will add username and password fields, and also add some methods for authentication

module.exports = mongoose.model("User", UserSchema);