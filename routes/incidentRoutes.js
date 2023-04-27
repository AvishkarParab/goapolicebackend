const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth")
const verifyPIRole = require("../middleware/verifyPIRole")


const {
    createIncident,
    getGroupOfReportedBy,
    getIncidentOfUser
} = require("../controllers/incidentController");



// router.get("/all",auth,verifyPIRole,getAllUsers);

router.post("/create",auth,createIncident);

router.get("/reportedgroup/:id",auth,getGroupOfReportedBy);

router.get("/reportedincidents/:id",auth,getIncidentOfUser);

// router.put("/update/:id",auth,updateUser)

// router.delete("/delete/:id",auth,deleteUser)

module.exports = router;