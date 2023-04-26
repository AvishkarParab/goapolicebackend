const mongoose = require("mongoose");

const customRoutesSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    gid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Group'
    },
    curRoutes:[
        {
            place:String,
            
            ltd:String,
            lgn:String,
        },
    ],
    pastRoutes:[
        [   
            {
                place:String,
                ltd:String,
                lgn:String,
            }
        ],
    ],
   
});

const CustomRoute =  mongoose.model("CustomRoute",customRoutesSchema);
module.exports = CustomRoute;