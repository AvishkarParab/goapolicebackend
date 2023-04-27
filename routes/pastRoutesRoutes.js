const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  getPastRoutes,
  addPastRoutes,
} = require("../controllers/pastRoutesController");

// router.get("/all",auth,verifyPIRole,getAllUsers);

router.get("/:gid", auth, getPastRoutes);
router.post("/add", auth, addPastRoutes);

// router.put("/update/:id",auth,updateUser)

// router.delete("/delete/:id",auth,deleteUser)

module.exports = router;
