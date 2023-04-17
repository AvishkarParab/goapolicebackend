const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")

const {
    getAllUsers,
    loginUser,
    updateUser,
    deleteUser,
    registerUser
} = require("../controllers/userController");



router.get("/all",auth,getAllUsers);

router.post("/login",loginUser)

router.post("/register",registerUser)

router.put("/update/:id",auth,updateUser)

router.delete("/delete/:id",auth,deleteUser)

module.exports = router;