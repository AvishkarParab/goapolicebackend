const Group = require("../models/group")
const User = require("../models/user")

const createGroup = async (req,res)=>{
    try {

        const {name,gcity,inspectorId,headconstables,ebeats} = req.body;
    
        //if empty data recieved
        if(!name || !gcity || !inspectorId || !headconstables || !ebeats){
            return res.status(401).json({
                "message":"Inavlid Data",
            });
        }

        //validating headconstables array
        if(!Array.isArray(headconstables)){
            return res.status(401).json({
                "message":"headconstables should be of type array",
            });
        }else{
            if(headconstables.length <= 1){
                return res.status(401).json({
                    "message":"Invalid length of headconstables",
                });
            }
        }
        //validating ebeats array
        if(!Array.isArray(ebeats)){
            return res.status(401).json({
                "message":"ebeats should be of type array",
            });
        }else{
            if(headconstables.length <= 1){
                return res.status(401).json({
                    "message":"Invalid length of ebeats",
                });
            }
        }
        //checking if headconstables exist in other groups
        let headExist = await Group.find({"headconstables":{"$in":headconstables}});
        if(headExist.length){
            return res.status(401).json({
                "message":"Head Constable already exist in some group",
                "data":headExist
            });
        }

        //checking if ebeats exist in other groups
        let ebeatExist = await Group.find({"ebeats":{"$in":ebeats}});
        if(ebeatExist.length){
            return res.status(401).json({
                "message":"E-Beat officer already exist in some group",
                "data":ebeatExist
            });
        }


        //creating group in database
        let groupData = await Group.create({
            name,gcity,inspectorId,headconstables,ebeats
        });


        if(groupData.id){
            return res.status(200).json({
                "message":"Group created Successfully",
                "data":groupData
            });
        }
    
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            "message":"Something went wrong",
        });
    }
}


const getAllGroup = async (req,res) =>{
    try {
        
        let allGroups = await Group.find({});

        if(allGroups){
            return res.status(200).json({
                "message":"Groups Data",
                "data":allGroups
            });
        }

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            "message":"Something went wrong",
        });
    }
}

const getGroup = async (req,res) =>{
    try {
        let id = req.params.id;
        let group = await Group.findById(id).populate("headconstables").populate("ebeats");
        return res.status(200).json({
            "message":"Groups Data",
            "data":group
        });

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            "message":"Something went wrong",
        });
    }
}

const updateGroup = async (req,res) =>{
    try {
        const {name,gcity,inspectorId,headconstables,ebeats} = req.body;
        const id = req.params.id;
        //if empty data recieved
        if(!id || !name || !gcity || !inspectorId || !headconstables || !ebeats){
            return res.status(401).json({
                "message":"Inavlid Data",
            });
        }

        //validating headconstables array
        if(!Array.isArray(headconstables)){
            return res.status(401).json({
                "message":"headconstables should be of type array",
            });
        }else{
            if(headconstables.length <= 1){
                return res.status(401).json({
                    "message":"Invalid length of headconstables",
                });
            }
        }
        //validating ebeats array
        if(!Array.isArray(ebeats)){
            return res.status(401).json({
                "message":"ebeats should be of type array",
            });
        }else{
            if(headconstables.length <= 1){
                return res.status(401).json({
                    "message":"Invalid length of ebeats",
                });
            }
        }
        //checking if headconstables exist in other groups
        // let headExist = await Group.find({"headconstables":{"$in":headconstables}});
        // if(headExist.length){
        //     return res.status(401).json({
        //         "message":"Head Constable already exist in some group",
        //         "data":headExist
        //     });
        // }

        //checking if ebeats exist in other groups
        // let ebeatExist = await Group.find({"ebeats":{"$in":ebeats}});
        // if(ebeatExist.length){
        //     return res.status(401).json({
        //         "message":"E-Beat officer already exist in some group",
        //         "data":ebeatExist
        //     });
        // }

        let updatedGroup = await Group.findByIdAndUpdate(id,{
            name,
            gcity,
            inspectorId,
            headconstables,
            ebeats
        },
        {new: true});
        
            return res.status(200).json({
                "message":"Group Updated Successfully",
                "data":updatedGroup
            });

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            "message":"Something went wrong",
        });
    }
}

const deleteGroup = async (req,res) =>{
    try {
        let id = req.params.id;


        let group = await Group.findByIdAndDelete(id);
        return res.status(200).json({
            "message":"Groups Deleted Successfully",
            "data":group
        });

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            "message":"Something went wrong",
        });
    }
}


module.exports = {
    createGroup,
    getAllGroup,
    getGroup,
    updateGroup,
    deleteGroup
    
}