var mongoose = require("mongoose");
var UserType = require("../models/userType");

exports.SeedUserTypes = async () => {
  var userTypes = await UserType.find();
  if (userTypes.length == 0) {
    new UserType({ type: "admin" }).save();
    new UserType({ type: "promoter" }).save();
    new UserType({ type: "client" }).save();
  }
};
