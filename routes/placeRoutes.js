const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")


const {
    createPlace,
    getPlace,
    updatePlace,
    deletePlace
} = require("../controllers/placeController");



// router.get("/all",auth,verifyPIRole,getAllUsers);

router.post("/create",auth,createPlace)

router.get("/",auth,getPlace);

router.put("/update/:id",auth,updatePlace)

router.delete("/delete/:id",auth,deletePlace)

module.exports = router;