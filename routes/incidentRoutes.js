const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const verifyPIRole = require("../middleware/verifyPIRole")


const {
    createIncident,
    getGroupOfReportedBy
} = require("../controllers/incidentController");



// router.get("/all",auth,verifyPIRole,getAllUsers);

router.post("/create",auth,createIncident)

router.get("/reportedgroup/:id",auth,getGroupOfReportedBy)

// router.put("/update/:id",auth,updateUser)

// router.delete("/delete/:id",auth,deleteUser)

module.exports = router;