const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    gcity:{
        type:String,
        required:true,
    },
    inspectorId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    headconstables:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
    ],
    ebeats:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            required:true,
        },
    ],
   
});

const Group =  mongoose.model("Group",groupSchema);
module.exports = Group;