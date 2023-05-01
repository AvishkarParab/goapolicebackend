const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: true,
  },
  gid: { type: mongoose.Schema.Types.ObjectId, ref: "Group" },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
