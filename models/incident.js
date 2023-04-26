const mongoose = require("mongoose");

const incidentSchema = new mongoose.Schema({
    reportedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    description:{
        type:String,
        required:true,
    },
    placeId:{
        type:String,
        required:true,
    },
    severity:{
        type:Number,
        required:true,
        enum:[1,2,3,4,5]
    }
    
},
{ timestamps: true });

const Incident =  mongoose.model("Incedent",incidentSchema);
module.exports = Incident;