var mongoose = require('mongoose');
var Location = require('./location').schema;

var EventSchema = new mongoose.Schema({
    name: { type: String, unique: true},
    description: String,
    date: String, // tem de ser string, caso seja Date ao editar vem vazio
    time: String,
    locationName: String,
    poster: String,
    nTicketsAvailable: Number,
    nTicketsPurchased: Number,
    price: Number
});

module.exports = mongoose.model('Event', EventSchema);