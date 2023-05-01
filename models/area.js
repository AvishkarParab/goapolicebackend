const mongoose = require("mongoose");

const areaSchema = new mongoose.Schema({
    name:{
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
});

const Area =  mongoose.model("Area",areaSchema);
module.exports = Area;