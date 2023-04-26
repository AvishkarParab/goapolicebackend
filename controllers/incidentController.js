
const Incident = require("../models/incident")

const createIncident = async (req,res) =>{
    try {
        const {reportedBy,description,severity,placeId} = req.body;
    
    //if empty data recieved
    if(!reportedBy || !description || !placeId ||!severity){
        return res.status(400).json({
            "message":"Inavlid Data",
        });
    }

    if(isNaN(severity)){
        return res.status(400).json({
            "message":"Severity should be of type Number",
        });
    }

    //inserting user database
    let created = await Incident.create({
        reportedBy,
        description,
        severity,
        placeId
    });
    
    if(created){
        return res.status(200).json({
            "message":"Incident Regsistered Successfully",
            "data":created
        });
    }
    
    } catch (error) {

        console.log(error);
        return res.status(401).json({
            "message":"Something went wrong",
        });
    }

}


// const updateUser = async (req,res)=>{
//     try {
//         const {name,policeId,email,gender,role} = req.body;
//         const id = req.params.id;
    
//     //if empty data recieved
//     if(!id|| !name || !policeId || !email || !gender || !role){
//         return res.status(400).json({
//             "message":"Inavlid Data",
//         });
//     }


//     let updatedUser = await User.findByIdAndUpdate(id,{
//         name,
//         policeId,
//         email,
//         gender,
//         role
//     },
//     {new: true});
    
//         return res.status(200).json({
//             "message":"User Updated Successfully",
//             "data":updatedUser
//         });

        
//     } catch (error) {
//         console.log(error);
//         return res.status(400).json({
//             "message":"Something went wrong",
//         });
//     }
// }

// const deleteUser = async (req,res)=>{
//     try {
//         const id = req.params.id;
    
//     //if empty data recieved
//     if(!id){
//         return res.status(400).json({
//             "message":"Inavlid ID",
//         });
//     }


//     let deletedUser = await User.findByIdAndDelete(id);

//     if(deletedUser){
//         console.log(deletedUser);
//         return res.json({
//             "message":"User Deleted Successfully",
//         }).status(200);
//     }else{
//         return res.status(503).json({
//             "message":"User ID Invalid",
//         });

//     }
    
        
//     } catch (error) {
//         console.log(error);
//         return res.status(503).json({
//             "message":"Something went wrong",
//         });
//     }
// }

// const getAllUsers = async (req,res) =>{

//     try {

//         let users = await User.find({});


//         return res.status(200).json({
//             "message":"All Users data",
//             "data":users
//         });

//     } catch (error) {
//         console.log(error);
//     }
    
// }



module.exports = {
    createIncident,
    // registerUser,
    // updateUser,
    // deleteUser,
    // loginUser
}