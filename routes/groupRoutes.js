const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const verifyPIRole = require("../middleware/verifyPIRole")


const {
    createGroup,
    getAllGroup,
    getGroup,
    updateGroup,
    deleteGroup
} = require("../controllers/groupController");


router.post("/create",auth,verifyPIRole,createGroup)

router.get("/allGroups",auth,getAllGroup)

router.get("/:id",auth,getGroup)

router.put("/:id",auth,updateGroup)

router.delete("/:id",auth,deleteGroup)

module.exports = router;