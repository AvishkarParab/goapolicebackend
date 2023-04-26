const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    area:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    pincode:{
        type:String,
        required:true,
    },
    city:{
        type:String,
        required:true
    },
    ltd:{
        type:String,
        required:true
    },
    lgn:{
        type:String,
        required:true
    }
});

const Place =  mongoose.model("Place",placeSchema);
module.exports = Place;