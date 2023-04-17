const jwt =  require("jsonwebtoken");

const verifyAuth = (req,res,next) =>{

try {
    
let token = req.headers.authorization;

if(token){
    token = token.split(" ")[1];
    let user = jwt.verify(token,process.env.SECRETKEY);
    req.user = user.id;

}else{
    res.status(401).json({
        error:"Unuthorized User"
    });
}

//call to the next function
next();

} catch (error) {
    console.log(error);
    res.status(401).json({
        error:"Unuthorized User"
    });
}



}

module.exports = verifyAuth;