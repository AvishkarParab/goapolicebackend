const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    policeId:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    gender:{
        type:String,
        enum : ['male','female'],
        default: 'male'
    },
    role:{
        type:String,
        enum : ['e-beat','pc','pn','hc','asi','psi','pi','sp','dsp'],
        required:true,
    }
});

const User =  mongoose.model("User",userSchema);
module.exports = User;