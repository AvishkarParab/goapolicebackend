const CustomRoute = require("../models/customRoutes")

const createRoute = async (req,res) =>{
    try {
        const {name,gid,curRoutes,pastRoutes} = req.body;
    
    //if empty data recieved
    if(!name || !gid || !curRoutes || !pastRoutes ){
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
        return res.status(200).json({
            "message":"User Regsistered Successfully",
            "data":[{user:created,token:token}]
        });
    }
    
    } catch (error) {

        console.log(error);
        return res.status(401).json({
            "message":"Something went wrong",
        });
    }

}





module.exports = {
    createRoute
}