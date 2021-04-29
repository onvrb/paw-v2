var mongoose = require('mongoose');

var EventSchema = new mongoose.Schema({
    name: String,
    quantity: Number
});

module.exports = mongoose.model('Event', EventSchema);