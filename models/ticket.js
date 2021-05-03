var mongoose = require('mongoose');
var Event = require('./event').schema;
var User = require('./user').schema

var TicketSchema = new mongoose.Schema({
    price: Number,
    cancelled: Boolean,
    user: User,
    event: Event
});

module.exports = mongoose.model('Event', EventSchema);