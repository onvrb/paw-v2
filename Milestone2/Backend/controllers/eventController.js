var mongoose = require('mongoose');
var Event = require('../models/event'); //chama modelo de event
var Location = require('../models/location'); //chama modelo de location
var User = require('../models/user');
var UserType = require('../models/userType');

const eventController = {};

eventController.showAll = async function (req, res) {
    try {
        var query = req.query;
        var events = await Event.find(query).populate('location').populate('promoters'); //popular o campo location com informação
        res.status(200).jsonp({ events: events });
    } catch (error) {
        res.status(500).jsonp({ message: "Error finding events", error: error });
    }
}

eventController.show = async function (req, res) {
    try {
        var event = await (Event.findOne({ _id: req.params.id })).populate('location').populate('promoters'); //popular o campo location com informação
        res.status(200).jsonp({ event: event });
    } catch (error) {
        res.status(500).jsonp({ message: "Error finding event", error: error })
    }
}

eventController.create = async function (req, res) {
    try {
        console.log(req.body)
        var location = await Location.findOne({ name: req.body.location });
        req.body.location = location;
        var event = await Event.create(req.body);
        res.status(200).jsonp({ event: event });
    } catch (error) {
        res.status(500).jsonp({ message: "Error creating event", error: error });
    }
};

eventController.edit = async function (req, res) {
    try {
        var event = await Event.findOneAndUpdate({ _id: req.params.id }, req.body);
        res.status(200).jsonp({ event: event });
    } catch (error) {
        res.status(500).jsonp({ message: "Error editing event", error: error });
    }
};

eventController.delete = async function (req, res) {
    try {
        var event = await Event.deleteOne({ _id: req.params.id });
        res.status(200).jsonp({ event: event });
    } catch (error) {
        console.log(error);
        res.status(500).jsonp({ message: "Error deleting event", error: error });
    }
}

module.exports = eventController;