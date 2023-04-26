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
        type:mongoose.Schema.Types.ObjectId,
        ref:"Place",
    },
    severity:{
        type:Number,
        required:true,
        enum:[1,2,3,4,5]
    },
    incidentType:{
        type:String,
        required:true,
        enum:["MV Cases","Garbage","Smoking Spitting","COTPA","Tenants Checked","Servants Checked","Summons Served","Summons Pending","Warrants Served",'Warrants Pending']
    }
    
},
{ timestamps: true });

const Incident =  mongoose.model("Incedent",incidentSchema);
module.exports = Incident;