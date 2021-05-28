var mongoose = require("mongoose");
const Schema = mongoose.Schema;

var EventSchema = new mongoose.Schema({
  name: { type: String, unique: true },
  description: String,
  date: String, // tem de ser string, caso seja Date ao editar vem vazio
  time: String,
  location: { type: Schema.Types.ObjectId, ref: "Location" }, //para importar a referencia de location
  promoters: [{ type: Schema.Types.ObjectId, ref: "User" }],
  poster: String,
  nTicketsAvailable: Number,
  nTicketsPurchased: Number,
  price: Number,
});

module.exports = mongoose.model("Event", EventSchema);
