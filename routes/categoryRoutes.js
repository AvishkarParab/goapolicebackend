const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");

const {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryBygid,
} = require("../controllers/categoryController");

router.post("/create", auth, createCategory);

router.get("/allCategorys", auth, getAllCategory);

router.get("/:id", auth, getCategory);

router.put("/:id", auth, updateCategory);

router.delete("/:id", auth, deleteCategory);
router.get("/getgroupcategory/:id", auth, getCategoryBygid);

module.exports = router;
