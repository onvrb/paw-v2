var mongoose = require('mongoose');
var Event = require('../models/event');

var LocationSchema = new mongoose.Schema({
    name: { type: String, unique: true, required: true },
    address: { type: String, required: true },
    capacity: { type: Number, required: true },
    limit: { type: Number, required: true },
});

LocationSchema.pre('deleteOne', () => {
    let events = await Event.find({ location: this.name });
    if (events) {
        var err = new Error('Location has events.');
        next(err);
    }
    else {
        next();
    }
})

module.exports = mongoose.model('Location', LocationSchema);