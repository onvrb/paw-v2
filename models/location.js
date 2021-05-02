var mongoose = require('mongoose');

var LocationSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    address: String,
    capacity: Number,
    limit: Number
});

module.exports = mongoose.model('Location', LocationSchema);