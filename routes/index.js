const express = require("express");
const router = express.Router();
let users =  require("./userRoutes");

router.use("/users",users);


module.exports = router;