const express = require("express");
const router = express.Router();
let users =  require("./userRoutes");
let gropus =  require("./groupRoutes");


router.use("/users",users);

router.use("/groups",gropus);



module.exports = router;