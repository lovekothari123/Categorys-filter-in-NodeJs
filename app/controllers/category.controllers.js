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
    timeslots: timeSlotsGenrater(req.body.Starttime, req.body.Endtime),
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

function timeSlotsGenrater(starttime, endtime) {
  function parseTime(s) {
    var c = s.split(":");
    return parseInt(c[0]) * 60 + parseInt(c[1]);
  }
  function convertHours(mins) {
    var hour = Math.floor(mins / 60);
    var mins = mins % 60;
    var converted = pad(hour, 2) + ":" + pad(mins, 2);
    return converted;
  }

  function pad(str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
  }

  function calculate_time_slot(start_time, end_time, interval = "30") {
    var i, formatted_time;
    var time_slots = new Array();
    for (var i = start_time; i <= end_time; i = i + interval) {
      formatted_time = convertHours(i);
      time_slots.push(formatted_time);
    }
    return time_slots;
  }

  
  console.log("#####################");
  console.log(parseTime(starttime), parseTime(endtime));
  var times_ara = calculate_time_slot(
    parseTime(starttime),
    parseTime(endtime),
    30
  );
  console.log(times_ara);
  return times_ara;
}

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
