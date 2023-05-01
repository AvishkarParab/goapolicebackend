const mongoose = require("mongoose");

const customRoutesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:false,
    },
    gid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group',
    },
    curRoutes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Area',
        }
    ],
   
});

const CustomRoute =  mongoose.model("CustomRoute",customRoutesSchema);
module.exports = CustomRoute;