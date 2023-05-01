const { default: mongoose } = require("mongoose");
const Group = require("../models/group");
const User = require("../models/user");
const Visited = require("../models/visitedPlace");
const VisitedPlace = require("../models/visitedPlace");

const getVisitedPlaces = async (req, res) => {
  try {
    // if Pi then return places of all the group

    let curUser = await User.findById(req.user);
    let places = [];
    if (curUser.role == "pi") {
      // console.log(req.user);
      // use group id to find the places
      let group = await Group.findOne({ inspectorId: req.user });
      //   console.log(group);
      if (group) {
        var id = new mongoose.Types.ObjectId(group.id);

        const vis = await Visited.aggregate([
          {
            $match: {
              gid: id,
            },
          },
          {
            $group: {
              _id: { $week: "$createdAt" },
              count: { $sum: 1 },
              gid: { $addToSet: "$gid" },
              visitedBy: { $addToSet: "$visitedBy" },
            },
          },
          {
            $sort: {
              _id: 1,
            },
          },
        ]);
        // places = await Visited.find({ gid: id });
        // places = Visited.find({});
        return res.status(200).json({
          message: "places Fetched Successfully",
          data: vis[vis.length - 1],
        });
      } else {
        return res.status(200).json({
          message: "No places Found",
        });
      }
    }
    if (curUser.role == "admin") {
      places = await Visited.aggregate([
        {
          $group: {
            _id: { $week: "$createdAt" },
            count: { $sum: 1 },
            gid: { $addToSet: "$gid" },
            visitedBy: { $addToSet: "$visitedBy" },
          },
        },
      ]);
      if (places) {
        return res.status(200).json({
          message: "places Fetched Successfully",
          data: places,
        });
      } else {
        return res.status(200).json({
          message: "No places",
          data: places,
        });
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};
const addVisitedPlace = async (req, res) => {
  try {
    const { placeId, gid, visitedBy } = req.body;

    //if empty data recieved
    if (!placeId || !gid || !visitedBy) {
      return res.status(400).json({
        message: "Incomplete  Data",
      });
    }

    //inserting place database
    let created = await Visited.create({
      placeId,
      gid,
      visitedBy,
    });

    if (created) {
      return res.status(200).json({
        message: "Visited Place marked Successfully",
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

const getAllVisitedPlaces = async (req,res)=>{
  try {
   
    const visitedPlaces = await VisitedPlace.find({})

    if (visitedPlaces.length) {
      return res.status(200).json({
        "message": "Visited Place Fetched Successfully",
        "data": visitedPlaces,
      });
    }else{
      return res.status(200).json({
        "message": "No Visited Place Found",
      });
    }


  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
}

module.exports = {
  addVisitedPlace,
  getVisitedPlaces,
  getAllVisitedPlaces
};
