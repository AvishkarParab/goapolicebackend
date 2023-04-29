const mongoose = require("mongoose");

const visitedSchema = new mongoose.Schema({
    placeId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Place'
    },
    gid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group'
    },
    visitedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
   
},{timestamps:true});

const VisitedPlace =  mongoose.model("VisitedPlace",visitedSchema);
module.exports = VisitedPlace;