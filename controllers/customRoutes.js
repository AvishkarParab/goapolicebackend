const CustomRoute = require("../models/customRoutes");
const Place = require("../models/place");

const createRoute = async (req, res) => {
  try {
    const { name, gid, curRoutes } = req.body;

    //if empty data recieved
    if (!name || !gid || !curRoutes) {
      return res.status(400).json({
        message: "Inavlid Data",
      });
    }

    if(!Array.isArray(curRoutes)){
      return res.status(401).json({
          "message":"curRoutes should be of type array",
      });
  }

  const placesExist = await Place.find({"_id":{$in:curRoutes}});
  
  if(!placesExist.length){
    return res.status(401).json({
      "message":"Yeahh places Exist",
      data : placesExist
    });
  }


    // const pastRoutes = [];
    // if (await CustomRoute.find({ name })) {
    //   return res.status(201).json({
    //     message: "name already exists",
    //   });
    // }
    // const existing_route = await CustomRoute.find({ gid });
    // if (existing_route) {
    //   console.log(existing_route[0].curRoutes);
    //   if (existing_route[0].curRoutes.length > 0)
    //     pastRoutes = existing_route[0].pastRoutes.push(
    //       existing_route[0].curRoutes
    //     );
    //   return res.status(200).json({
    //     existing_route,
    //   });
    // }
    // if (curRoutes.length > 0) {
    //   pastRoutes.push(curRoutes);
    // } else {
    //   console.log(error);
    //   return res.status(401).json({
    //     message: "Something went wrong",
    //   });
    // }
    // //inserting user database
    
    
    let created = await CustomRoute.create({
      name,
      gid,
      curRoutes,
    });

    if (created) {
      return res.status(200).json({
        message: "Route Regsistered Successfully",
        data: created,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createRoute,
};
