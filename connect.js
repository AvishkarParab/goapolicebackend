const mongoose = require("mongoose");

const connectDB = async()=>{
    try {
        mongoose.connect(process.env.DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
           
        });
        console.log("Databse Conected");
    } catch (error) {
        console.log(error);
    }
};

module.exports =  connectDB;