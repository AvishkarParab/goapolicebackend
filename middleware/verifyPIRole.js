const jwt =  require("jsonwebtoken");
const User = require("../models/user")


const verifyPIRole = async(req,res,next)=>{
try {
    let curUser = await User.findById(req.user);
    
    if(curUser.role === 'pi' || curUser.role === 'psi'){
        next();

    }else{

        res.status(401).json({
            error:"Unuthorized User Role"
        });
    }
    

} catch (error) {
    console.log(error);
    res.status(401).json({
        error:"Unuthorized User Role"
    });
}
}

module.exports = verifyPIRole;