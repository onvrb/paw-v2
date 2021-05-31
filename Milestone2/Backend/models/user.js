var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: Schema.Types.ObjectId, ref: 'UserType', required: true }, //para importar a referencia de userType
  covid: { type: Boolean, default: false },
  banned: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", UserSchema);
