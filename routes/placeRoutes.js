const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")


const {
    createPlace,
    getPlace
    
} = require("../controllers/placeController");



// router.get("/all",auth,verifyPIRole,getAllUsers);

router.post("/create",auth,createPlace)

router.get("/",auth,getPlace);

// router.put("/update/:id",auth,updateUser)

// router.delete("/delete/:id",auth,deleteUser)

module.exports = router;