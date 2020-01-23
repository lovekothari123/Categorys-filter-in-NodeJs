const mongoose = require("mongoose");
const TableName = require("../../config/constant");

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String
    },    
    Status: {
      type: String
    },
    Address: {
      type: String
    },
    Rating: {
      type: Number
    },
    Bedsidemanner: {
      type: String
    },
    Waittime: {
      type: String
    },
    Description: {
      type: String
    },
    Image: {
      type: String
    },
    Imagestatus: {
      type: String
    },
    Starttime: {
      type: String
    },
    Endtime: {
      type: String
    },
    Gender: { type: String, enum: ["Male", "female"] },
    Illness: {
      type: Array,
      default: []
    },
    Specialties: {
      type: Array,
      default: []
    },
    Hospitalaffiliations: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(TableName.CATEGORY_TABLE_NAME, CategorySchema);
