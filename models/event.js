var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    name: { type: String, unique: true},
    description: String,
    poster: String,
    nTicketsAvailable: Number,
    nTicketsPurchased: Number,
    price: Number
});

module.exports = mongoose.model('Event', EventSchema);