var mongoose = require('mongoose');
var Event = require('./event').schema;
var User = require('./user').schema

var TicketSchema = new mongoose.Schema({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    event: { type: Schema.Types.ObjectId, ref: "Event", required: true },
    price: { type: Number, required: true },
    cancelled: { type: Boolean, default: false }
});

module.exports = mongoose.model('Ticket', TicketSchema);