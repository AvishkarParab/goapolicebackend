const mongoose = require("mongoose");

const customRoutesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    gid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group',
    },
    curRoutes:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Place',
        }
    ],
   
});

const CustomRoute =  mongoose.model("CustomRoute",customRoutesSchema);
module.exports = CustomRoute;