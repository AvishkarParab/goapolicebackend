const Visited = require("../models/visitedPlace");


const addVisitedPlace = async(req,res)=>{
    try {
        const {placeId,gid,visitedBy} = req.body;
    
        //if empty data recieved
        if(!placeId || !gid || !visitedBy){
            return res.status(400).json({
                "message":"Incomplete  Data",
            });
        }
    
    
        //inserting place database
        let created = await Visited.create({
            placeId,
            gid,
            visitedBy
        });
        
        if(created){
            return res.status(200).json({
                "message":"Visited Place marked Successfully",
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

module.exports = {
    addVisitedPlace,
    
}