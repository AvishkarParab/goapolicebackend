const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")


const {
    createPlace
    
} = require("../controllers/placeController");



// router.get("/all",auth,verifyPIRole,getAllUsers);

router.post("/create",auth,createPlace)

// router.put("/update/:id",auth,updateUser)

// router.delete("/delete/:id",auth,deleteUser)

module.exports = router;