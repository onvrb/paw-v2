var mongoose = require("mongoose");
var UserType = require('./userType').schema;

var UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  password: String,
  type: UserType,
  covid: Boolean,
  banned: Boolean,
});

module.exports = mongoose.model("User", UserSchema);
