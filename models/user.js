var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  password: String,
  type: { type: Schema.Types.ObjectId, ref: 'UserType' },
  covid: Boolean,
  banned: Boolean,
});

module.exports = mongoose.model("User", UserSchema);
