const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const verifyPIRole = require("../middleware/verifyPIRole")


const {
    getAllUsers,
    loginUser,
    updateUser,
    deleteUser,
    registerUser,
    getUserGroup
} = require("../controllers/userController");



router.get("/all",auth,verifyPIRole,getAllUsers);

router.post("/login",loginUser)

router.post("/register",registerUser)

router.put("/update/:id",auth,updateUser)

router.delete("/delete/:id",auth,deleteUser)

router.get("/usergroup/:id",auth,getUserGroup);


module.exports = router;