const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  addVisitedPlace,
  getVisitedPlaces,
  getAllVisitedPlaces
} = require("../controllers/visitedController");

// router.get("/all",auth,verifyPIRole,getAllUsers);

router.post("/add",auth,addVisitedPlace)

router.get("/all",auth,getAllVisitedPlaces);

// router.put("/update/:id",auth,updatePlace)

// router.delete("/delete/:id",auth,deletePlace)

module.exports = router;
