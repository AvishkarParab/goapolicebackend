const express = require("express");
const router = express.Router();
let users = require("./userRoutes");
let gropus = require("./groupRoutes");
let customRoutes = require("./customRoutes");
let incidents = require("./incidentRoutes");
let places = require("./placeRoutes");
let category = require("./categoryRoutes");
let pastroutes = require("./pastRoutesRoutes");

router.use("/users", users);

router.use("/groups", gropus);

router.use("/routes", customRoutes);

router.use("/incidents", incidents);

router.use("/places", places);

router.use("/category", category);

router.use("/pastroutes", pastroutes);

module.exports = router;
