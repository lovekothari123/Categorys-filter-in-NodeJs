module.exports = app => {
  //Import your controller here for access every api
  const category = require("../controllers/category.controllers"); // import categorys for access methods of routes
  const API_NAME = require("../../config/constant"); // import all api names from constant files
  app.post(API_NAME.API_CATEGORY, category.insertNewCategory); // POST data to add category
  app.get(API_NAME.API_CATEGORY, category.allCategoryList); // GET list of all categorys
  
};
