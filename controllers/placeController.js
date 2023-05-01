const Area = require("../models/area");
const Category = require("../models/category");
const Place = require("../models/place");
const VisitedPlace = require("../models/visitedPlace");

const createPlace = async (req, res) => {
  try {
    const { name, area, category, ltd, lgn } = req.body;

    //if empty data recieved
    if (!name || !area || !category || !ltd || !lgn) {
      return res.status(400).json({
        message: "Incomplete  Data",
      });
    }

    //checking category

    let findCategory = await Category.findById(category);
    if (!findCategory.id) {
      return res.status(400).json({
        message: "Category Not Found",
      });
    }

    //checkin Area
    let findArea = await Area.findById(area);
    if (!findArea.id) {
      return res.status(400).json({
        message: "Area Not Found",
      });
    }
    //inserting place database
    let created = await Place.create({
      name,
      area,
      category,
      ltd,
      lgn,
    });

    if (created) {
      return res.status(200).json({
        message: "Place Regsistered Successfully",
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

const getPlace = async (req, res) => {
  try {
    const { area, category } = req.query;

    let places = await Place.find({ area, category });

    if (places.length) {
      return res.status(200).json({
        message: "Place fetched Successfully",
        data: places,
      });
    } else {
      return res.status(200).json({
        message: "No Places Found",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};
const updatePlace = async (req, res) => {
  try {
    const { name, area, category, ltd, lgn } = req.body;
    const id = req.params.id;

    //if empty data recieved
    if (!name || !area || !category || !ltd || !lgn) {
      return res.status(400).json({
        message: "Incomplete Data",
      });
    }

    //checking category

    let findCategory = await Category.findById(category);

    if (!findCategory.id) {
      return res.status(400).json({
        message: "Category Not Found",
      });
    }

    //checking category

    let findArea = await Category.findById(area);

    if (!findArea.id) {
      return res.status(400).json({
        message: "Area Not Found",
      });
    }

    let updatedPlace = await Place.findByIdAndUpdate(
      id,
      {
        name,
        area,
        category,
        ltd,
        lgn,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "Place Updated Successfully",
      data: updatedPlace,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: "Something went wrong",
    });
  }
};

const deletePlace = async (req, res) => {
  try {
    const id = req.params.id;

    //if empty data recieved
    if (!id) {
      return res.status(400).json({
        message: "Inavlid ID",
      });
    }

    let deletedPlace = await Place.findByIdAndDelete(id);

    if (deletedPlace) {
      return res
        .json({
          message: "Place Deleted Successfully",
        })
        .status(200);
    } else {
      return res.status(503).json({
        message: "Place ID Invalid",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      message: "Something went wrong",
    });
  }
};

const getAllPlace = async (req, res) => {
  try {
    let places = await Place.find({});
    return res.status(200).json({
      message: "All Places data",
      data: places,
    });
  } catch (error) {
    console.log(error);
    return res.status(503).json({
      message: "Something went wrong",
    });
  }
};

const verifyLocationReached = async (req, res) => {
  try {
    const { userid, placeid, gid, ltd, lgn } = req.body;

    //if empty data recieved
    if (!userid || !placeid || !gid || !ltd || !lgn) {
      return res.status(400).json({
        message: "Incomplete  Data",
      });
    }

    //checking category

    let findPlace = await Place.findById(placeid);
    if (!findPlace.id) {
      return res.status(400).json({
        message: "Place Not Found",
      });
    }

    if (findPlace.ltd === ltd && findPlace.lgn === lgn) {
      //inserting visited database
      let created = await VisitedPlace.create({
        placeId: placeid,
        gid,
        visitedBy: userid,
      });

      if (created) {
        return res.status(200).json({
          message: "Place Visited Marked",
          data: created,
        });
      }
    } else {
      return res.status(401).json({
        message: "Incorrect Location marked",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};

const getPlacebyArea = async (req, res) => {
  try {
    const area = req.params.id;
    const place = await Place.find({ area });
    // console.log(place);
    return res.status(200).json({
      message: "Area Places ",
      data: place,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};
//note: marking location userid, placeid, gid , ltd, lgn

module.exports = {
  createPlace,
  getPlace,
  updatePlace,
  deletePlace,
  getAllPlace,
  verifyLocationReached,
  getPlacebyArea,
};
