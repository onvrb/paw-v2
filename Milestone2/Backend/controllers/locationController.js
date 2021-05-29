var mongoose = require("mongoose");
var Location = require("../models/location");
var Event = require('../models/event');

var locationController = {};

//Shows all locations
locationController.showAll = async function (req, res) {
  try {
    var locations = await Location.find();
    res.jsonp({ locations: locations });
  } catch (error) {
    res.jsonp({ message: "Error showing all locations", error: error,});
  }
};

//Shows one location
locationController.show = async function (req, res) {
  let id = req.params.id;
  try {
    var location = await Location.findOne({ _id: id });
    res.jsonp({ location: location });
  } catch (error) {
    res.jsonp({ message: "Error finding location", error: error });
  }
};

//Location post
locationController.create = async function (req, res) {
  let body = req.body;
  try {
    var location = await Location.create(body);
    res.jsonp(location);
  } catch (error) {
    res.jsonp({ message: "Error creating location", error: error });
  }
};

//Location editing form
locationController.formEdit = async function (req, res) {
  let id = req.params.id;
  try {
    var location = await Location.findOne({ _id: id });
    res.jsonp({ location: location });
  } catch (error) {
    res.jsonp({ message: "Error finding location", error: error });
  }
};

//Location edit post
locationController.edit = async function (req, res) {
  let body = req.body;
  let id = req.params.id;
  try {
    await Location.findOneAndUpdate({ _id: id }, body);
    res.jsonp(id);
  } catch (error) {
    res.jsonp({ message: "Error editing location", error: error });
  }
};

//Delete location
locationController.delete = async function (req, res) {
  let id = req.params.id;
  try {
    var events = await Event.find({location: id});
    if (events.length) {
      res.jsonp({ message: "Error deleting location. There are events at this location", error: {} });
    }else {
      var location = await Location.deleteOne({ _id: id });
      res.jsonp(location);
    }    
  } catch (error) {
    res.jsonp({ message: "Error deleting location", error: error });
  }
};

module.exports = locationController;
