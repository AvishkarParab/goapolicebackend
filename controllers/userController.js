const bcryptjs = require("bcryptjs")
const jwt =  require("jsonwebtoken")
const User = require("../models/user")

const registerUser = async (req,res) =>{
    try {
        const {name,policeId,email,password,gender,role} = req.body;
    
    //if empty data recieved
    if(!name || !policeId || !email || !password || !gender || !role){
        return res.json({
            "message":"Inavlid Data",
        }).status(400);
    }

    //To check if same police id exist or not
    let userExist = User.findOne({"policeId":policeId});

    if(userExist.id){
        return res.json({
            "message":"User Already registered",
        }).status(400);
    }

    //hashing the password for security

    let hashpass =await  bcryptjs.hash(password,10);
    //inserting user database
    let created = await User.create({
        name,
        policeId,
        email,
        password:hashpass,
        gender,
        role
    });

    const token = jwt.sign({id:created._id,policeId:created.policeId},process.env.SECRETKEY)
    
    if(created){
        return res.json({
            "message":"User Regsistered Successfully",
            "data":[{user:created,token:token}]
        }).status(200);
    }
    
    } catch (error) {

        console.log(error);
        return res.json({
            "message":"Something went wrong",
        }).status(401);
    }

}

const loginUser = async (req,res) =>{
    try {
        const {policeId,password} = req.body;
    
    //if empty data recieved
    if(!policeId || !password ){
        return res.json({
            "message":"Inavlid Data",
        }).status(400);
    }

    //To check if same police id exist or not
    let userExist = await User.findOne({"policeId":policeId});
    if(userExist){
    const pp = await bcryptjs.compare(password,userExist.password);
        if(pp){
            const token = jwt.sign({id:userExist._id,policeId:userExist.policeId},process.env.SECRETKEY)

            return res.json({
                "message":"User Logged In Successfully",
                "data":[{user:userExist,token:token}]
            }).status(200);
        }

    }else{
        return res.json({
            "message":"User Not Found",
        }).status(400);
    
    }

    } catch (error) {

        console.log(error);
        return res.json({
            "message":"Something went wrong",
        }).status(400);
    }
}

const updateUser = async (req,res)=>{
    try {
        const {name,policeId,email,gender,role} = req.body;
        const id = req.params.id;
    
    //if empty data recieved
    if(!id|| !name || !policeId || !email || !gender || !role){
        return res.json({
            "message":"Inavlid Data",
        }).status(400);
    }


    let updatedUser = await User.findByIdAndUpdate(id,{
        name,
        policeId,
        email,
        gender,
        role
    },
    {new: true});
    
        return res.json({
            "message":"User Updated Successfully",
            "data":updatedUser
        }).status(200);

        
    } catch (error) {
        console.log(error);
        return res.json({
            "message":"Something went wrong",
        }).status(400);
    }
}

const deleteUser = async (req,res)=>{
    try {
        const id = req.params.id;
    
    //if empty data recieved
    if(!id){
        return res.json({
            "message":"Inavlid ID",
        }).status(400);
    }


    let deletedUser = await User.findByIdAndDelete(id);

    if(deletedUser){
        console.log(deletedUser);
        return res.json({
            "message":"User Deleted Successfully",
        }).status(200);
    }else{
        return res.status(503).json({
            "message":"User ID Invalid",
        });

    }
    
        
    } catch (error) {
        console.log(error);
        return res.json({
            "message":"Something went wrong",
        }).status(503);
    }
}

const getAllUsers = async (req,res) =>{

    try {

        let users = await User.find({});


        return res.json({
            "message":"All Users data",
            "data":users
        }).status(200);

    } catch (error) {
        console.log(error);
    }
    
}



module.exports = {
    getAllUsers,
    registerUser,
    updateUser,
    deleteUser,
    loginUser
}