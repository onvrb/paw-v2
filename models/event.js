var mongoose = require('mongoose');
var Location = require('./location').schema;

var EventSchema = new mongoose.Schema({
    name: { type: String, unique: true},
    description: String,
    locationname: Location,
    poster: String,
    nTicketsAvailable: Number,
    nTicketsPurchased: Number,
    price: Number,
    date: String,
    hour: String
});

module.exports = mongoose.model('Event', EventSchema);