const PastRoutes = require("../models/pastRoutes");
const Group = require("../models/group");


const getPastRoutes = async (req, res) => {
  try {
    const gid = req.params.gid;
    let pastRoute = await PastRoutes.find({ gid });

    if (pastRoute) {
      return res.status(200).json({
        "message":"Past Rroutes Fetched Successfully",
        "data":pastRoute,
      });
    } else {
      return res.status(200).json({
        message: "no past routes",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(204).json({
      "message": "error while getting past routes",
    });
  }
};

const addPastRoutes = async (req, res) => {
  try {
    const { gid, pastRoute } = req.body;


    const groupExist = await Group.findById(gid);

    if(!groupExist.id){
      return res.status(401).json({
        "message": "Group Not Found",
      });
    }

    // if(!Array.isArray(pastRoute)){
    //   return res.status(401).json({
    //       "message":"pastRoute should be of type array",
    //   });
    // }

    const pastGroupExist = await PastRoutes.findOne({gid});

    if(pastGroupExist){

      //appending the new route to the pastv route
      const newPastGrp = [...pastGroupExist.pastRoute , pastRoute]

      const pastRouteUpdated = await PastRoutes.findByIdAndUpdate(pastGroupExist.id,{
        gid,
        pastRoute:newPastGrp,
      },
      {new:true});

      if(pastRouteUpdated){
        return res.status(200).json({
          "message":"Past Route Added Successfully",        
          "data":pastRouteUpdated,
        });
      }
      

    }else{

      let newPastRoute = [pastRoute];

      const pastRouteCreated = await PastRoutes.create({
        gid,
        pastRoute:newPastRoute,
      });
  
      if (pastRouteCreated) {
        return res.status(200).json({
          "message":"Past Route Added Successfully",        
          "data":pastRouteCreated,
        });
      }
    }

  } catch (error) {

    console.log(error);
    return res.status(401).json({
      "message": "something went wrong",
    });
  }
};
module.exports = {
  getPastRoutes,
  addPastRoutes,
};
