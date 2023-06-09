const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const verifyPIRole = require("../middleware/verifyPIRole")


const {
    createRoute,
    getRoutebyGroup
} = require("../controllers/customRoutes");


router.post("/create",auth,createRoute)

router.get("/group/:gid",auth,getRoutebyGroup)

// router.get("/allGroups",auth,getAllGroup)

// router.get("/:id",auth,getGroup)

// router.put("/:id",auth,updateGroup)

// router.delete("/:id",auth,deleteGroup)

module.exports = router;