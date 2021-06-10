var mongoose = require("mongoose");
const Schema = mongoose.Schema;
var Ticket = require('../models/ticket');

var EventSchema = new mongoose.Schema({
  name: { type: String, unique: true, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  location: { type: Schema.Types.ObjectId, ref: "Location", required: true },
  promoters: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  poster: { type: String, required: true },
  price: { type: Number, required: true },
});

//cant delete if event has tickets sold
EventSchema.pre('deleteOne', async (next) => {
  let tickets = await Ticket.find({ event: this.name });
  if (tickets) {
    var err = new Error('Event has sold tickets.');
    next(err);
  }
  else {
    next();
  }
})

module.exports = mongoose.model("Event", EventSchema);
