const Area = require("../models/area");
const CustomRoute = require("../models/customRoutes");
const Place = require("../models/place");

const createRoute = async (req, res) => {
  try {
    const { name, gid, curRoutes } = req.body;

    //if empty data recieved
    if (!name || !gid || !curRoutes) {
      return res.status(400).json({
        "message": "Inavlid Data",
      });
    }

    if(!Array.isArray(curRoutes)){
      return res.status(401).json({
          "message":"curRoutes should be of type array",
      });
    }

  const areaExist = await Area.find({"_id":{$in:curRoutes}});
  
  if(!areaExist.length){
    return res.status(401).json({
      "message":"Area does not Exist",
      "data" : areaExist
    });
  }
       
    let created = await CustomRoute.create({
      name,
      gid,
      curRoutes,
    });

    if (created) {
      return res.status(200).json({
        message: "Route Regsistered Successfully",
        "data": created,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};


const getRoutebyGroup = async (req,res) =>{
  try {
    let gid = req.params.gid;
    let groupRoutes = await CustomRoute.find({gid}).populate("curRoutes");
    
    if(groupRoutes.length){
      return res.status(200).json({
        "message":"Custom Routes fetched Succesfully",
        "data":groupRoutes
      });
    }else{
      return res.status(200).json({
        "message":"Custom Routes not found",
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
  createRoute,
  getRoutebyGroup,
};
