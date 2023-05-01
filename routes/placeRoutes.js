const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createPlace,
  getPlace,
  updatePlace,
  deletePlace,
  getAllPlace,
  verifyLocationReached,
  getPlacebyArea,
} = require("../controllers/placeController");

// router.get("/all",auth,verifyPIRole,getAllUsers);

router.post("/create", auth, createPlace);

router.get("/byarea", auth, getPlace);

router.put("/update/:id", auth, updatePlace);

router.delete("/delete/:id", auth, deletePlace);

router.get("/allplaces", auth, getAllPlace);

router.post("/verifyreached", auth, verifyLocationReached);

router.get("/areaplace/:id", auth, getPlacebyArea);

module.exports = router;
