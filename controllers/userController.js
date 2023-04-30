const bcryptjs = require("bcryptjs")
const jwt =  require("jsonwebtoken")
const User = require("../models/user")
const Group = require("../models/group")


const registerUser = async (req,res) =>{
    try {
        const {name,policeId,email,password,gender,role} = req.body;
    
    //if empty data recieved
    if(!name || !policeId || !email || !password || !gender || !role){
        return res.status(400).json({
            "message":"Inavlid Data",
        });
    }

    //To check if same police id exist or not
    let userExist = User.findOne({"policeId":policeId});

    if(userExist.id){
        return res.status(400).json({
            "message":"User Already registered",
        });
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

        const { password, ...responseUser } = created._doc;
        return res.status(200).json({
            "message":"User Regsistered Successfully",
            "data":[{user:responseUser,token:token}]
        });
    }
    
    } catch (error) {

        console.log(error);
        return res.status(401).json({
            "message":"Something went wrong",
        });
    }

}

const loginUser = async (req,res) =>{
    try {
        const {policeId,password} = req.body;
    
    //if empty data recieved
    if(!policeId || !password ){
        return res.status(400).json({
            "message":"Inavlid Data",
        });
    }

    //To check if same police id exist or not
    let userExist = await User.findOne({"policeId":policeId});
    if(userExist){
    const pp = await bcryptjs.compare(password,userExist.password);
        if(pp){
            const token = jwt.sign({id:userExist._id,policeId:userExist.policeId},process.env.SECRETKEY)

            return res.status(200).json({
                "message":"User Logged In Successfully",
                "data":[{user:userExist,token:token}]
            });
        }

    }else{
        return res.status(400).json({
            "message":"User Not Found",
        });
    
    }

    } catch (error) {

        console.log(error);
        return res.status(400).json({
            "message":"Something went wrong",
        });
    }
}

const updateUser = async (req,res)=>{
    try {
        const {name,policeId,email,gender,role} = req.body;
        const id = req.params.id;
    
    //if empty data recieved
    if(!id|| !name || !policeId || !email || !gender || !role){
        return res.status(400).json({
            "message":"Inavlid Data",
        });
    }


    let updatedUser = await User.findByIdAndUpdate(id,{
        name,
        policeId,
        email,
        gender,
        role
    },
    {new: true});
    
        return res.status(200).json({
            "message":"User Updated Successfully",
            "data":updatedUser
        });

        
    } catch (error) {
        console.log(error);
        return res.status(400).json({
            "message":"Something went wrong",
        });
    }
}

const deleteUser = async (req,res)=>{
    try {
        const id = req.params.id;
    
    //if empty data recieved
    if(!id){
        return res.status(400).json({
            "message":"Inavlid ID",
        });
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
        return res.status(503).json({
            "message":"Something went wrong",
        });
    }
}

const getAllUsers = async (req,res) =>{

    try {

        let users = await User.find({});


        return res.status(200).json({
            "message":"All Users data",
            "data":users
        });

    } catch (error) {
        console.log(error);
    }
    
}

const getUserGroup = async (req,res)=>{

    try{
        const id = req.params.id;
        
        let userInfo = await User.findById(id);

        if(userInfo){

            let groupDetails=[];
            
            if(userInfo.role==="pi"){
                groupDetails = await Group.findOne({inspectorId:id});

            }else if(userInfo.role==="hc"){
                groupDetails = await Group.findOne({"headconstables":{"$in":id}}); 

            }else if(userInfo.role==="e-beat"){

                groupDetails = await Group.findOne({"ebeats":{"$in":id}});

            }
            
            if(groupDetails.id){
                return res.status(200).json({
                    "message":"Group Fetched Successfully",
                    "data":groupDetails
                });
            }else{
                return res.status(200).json({
                    "message":"No Group Found",
                });
            }
        }
    }catch (error) {
        console.log(error);
        return res.status(401).json({
            "message":"Something went wrong",
        });
    }
}



module.exports = {
    getAllUsers,
    registerUser,
    updateUser,
    deleteUser,
    loginUser,
    getUserGroup
}