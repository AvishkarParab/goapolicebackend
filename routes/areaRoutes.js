const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")


const {
    createArea,
    getAreaOnName,
    // getPlace,
    // updatePlace,
    // deletePlace,
    getAreaOnCity,
    getAllArea
} = require("../controllers/areaController");



// router.get("/all",auth,verifyPIRole,getAllUsers);

router.post("/add",auth,createArea)

// router.get("/",auth,getPlace);

// router.put("/update/:id",auth,updatePlace)

// router.delete("/delete/:id",auth,deletePlace)

router.get("/byname",auth,getAreaOnName)

router.get("/bycity",auth,getAreaOnCity)

router.get("/allareas",auth,getAllArea)


module.exports = router;