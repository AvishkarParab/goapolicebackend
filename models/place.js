const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    area:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Area',
        required:true,
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
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