const Category = require("../models/category");

const createCategory = async (req, res) => {
  try {
    const { categoryName, gid } = req.body;

    //if empty data recieved
    if (!categoryName || !gid) {
      return res.status(401).json({
        message: "Inavlid Data",
      });
    }

    //creating category in database
    let categoryData = await Category.create({
      categoryName,
      gid,
    });

    if (categoryData.id) {
      return res.status(200).json({
        message: "category created Successfully",
        data: categoryData,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    let allCategory = await Category.find({});
    console.log(allCategory);
    if (allCategory) {
      return res.status(200).json({
        message: "Category Data",
        data: allCategory,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};

const getCategory = async (req, res) => {
  try {
    let id = req.params.id;
    let category = await Category.findById(id);
    return res.status(200).json({
      message: "Category Data",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { categoryName } = req.body;
    const id = req.params.id;
    //if empty data recieved
    if (!id) {
      return res.status(401).json({
        message: "Inavlid Data",
      });
    }

    let updatedCategory = await Category.findByIdAndUpdate(
      id,
      {
        categoryName,
      },
      { new: true }
    );

    return res.status(200).json({
      message: "category Updated Successfully",
      data: updatedCategory,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    let id = req.params.id;

    let category = await Category.findByIdAndDelete(id);
    return res.status(200).json({
      message: "categorys Deleted Successfully",
      data: category,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};

const getCategoryBygid = async (req, res) => {
  try {
    const gid = req.params.id;
    const data = await Category.find({ gid });

    return res.status(200).json({
      message: "Group categorys data",
      data: data,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      message: "Something went wrong",
    });
  }
};

module.exports = {
  createCategory,
  getAllCategory,
  getCategory,
  updateCategory,
  deleteCategory,
  getCategoryBygid,
};
