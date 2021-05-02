var mongoose = require('mongoose');
var Event = require('./event').schema;

var TicketSchema = new mongoose.Schema({
    price: Number,
    cancelled: Boolean,
    //account
    event: Event
});

module.exports = mongoose.model('Event', EventSchema);