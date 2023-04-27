const pastRoutes = require("../models/pastRoutes");

const getPastRoutes = async (req, res) => {
  try {
    const gid = req.params.gid;
    let pastRoute = await pastRoutes.find({ gid });

    if (pastRoute) {
      return res.status(200).json({
        pastRoute,
      });
    } else {
      return res.status(200).json({
        message: "no past routes",
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(204).json({
      message: "error while getting past routes",
    });
  }
};

const addPastRoutes = async (req, res) => {
  try {
    const { gid, pastRoute } = res.body;

    let data = await pastRoutes.create({
      gid,
      pastRoute,
    });

    if (data) {
      return res.status(200).json({
        data,
      });
    }
  } catch (error) {}
};
module.exports = {
  getPastRoutes,
  addPastRoutes,
};
