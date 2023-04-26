const express = require("express");
const router = express.Router();
let users =  require("./userRoutes");
let gropus =  require("./groupRoutes");
let category = require("./categoryRoutes")


router.use("/users",users);

router.use("/groups",gropus);

router.use("/category",category)



module.exports = router;