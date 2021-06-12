var mongoose = require("mongoose");

var UserTypeSchema = new mongoose.Schema({
  type: { type: String, unique: true }, // Admin, Promoter, Client
});

module.exports = mongoose.model("UserType", UserTypeSchema);