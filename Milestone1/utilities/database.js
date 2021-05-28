var mongoose = require("mongoose");
var UserType = require("../models/userType");

exports.SeedUserTypes = async () => {
  var userTypes = await UserType.find();
  if (userTypes.length == 0) {
    new UserType({ type: "Admin" }).save();
    new UserType({ type: "Promoter" }).save();
    new UserType({ type: "Client" }).save();
  }
};
