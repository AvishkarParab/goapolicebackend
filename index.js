const express = require("express");
const app= express();
const dotenv =  require("dotenv");
dotenv.config({path:"./config.env"});
const router = require("./routes/index");
const cors = require("cors");
const bodyParser = require("body-parser");


//get the connection file to connect database 
const connectDB = require("./connect");
connectDB();



//port 
let port = process.env.PORT || 5000;

app.use(cors());
// app.use(express.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
app.use("/",router);



//starting the server
app.listen(port,()=>{
    
    console.log(`Server is Started at port ${port}`);
})