const Categorys = require("../model/category.model");
const SUCESS_ERROR_MESSAGES = require("../../config/constant");

exports.insertNewCategory = (req, res) => {
  if (req.body.name == null && req.body.name == undefined) {
    return res.send({
      status: false,
      code: 400,
      message: "All data is required"
    });
  }
  const addCategory = new Categorys({
    name: req.body.name,
    Status: req.body.Status,
    Address: req.body.Address,
    Rating: req.body.Rating,
    Bedsidemanner: req.body.Bedsidemanner,
    Waittime: req.body.Waittime,
    Description: req.body.Description,
    Image: req.body.Image,
    Imagestatus: req.body.Imagestatus,
    Starttime: req.body.Starttime,
    Endtime: req.body.Endtime,
    Gender: req.body.Gender,
    Illness: req.body.Illness,
    Specialties: req.body.Specialties,
    Hospitalaffiliations: req.body.Hospitalaffiliations
  });
  console.log("Request Response Data===>\n");
  console.log(req.body);
  addCategory
    .save()
    .then(data => {
      res.send({
        status: true,
        code: 200,
        message: SUCESS_ERROR_MESSAGES.CATEGORY_ADDED
      });
    })
    .catch(err => {
      res
        .status(false)
        .code(500)
        .send({
          message: err.message || SUCESS_ERROR_MESSAGES.SERVER_NOT_FOUND
        });
    });
};

exports.allCategoryList = (req, res) => {
  Categorys.find()
    .then(data => {
      res.send({
        status: true,
        code: 200,
        data: data
      });
    })
    .catch(err => {
      res.send({
        status: true,
        code: 200,
        message: err.message || SUCESS_ERROR_MESSAGES.SERVER_NOT_FOUND
      });
    });
};
