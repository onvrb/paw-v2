var mongoose = require("mongoose");
var Location = require("../models/location");
var Event = require('../models/event');

var locationController = {};

//Shows all locations
locationController.showAll = async function (req, res) {
  try {
    var locations = await Location.find();
    res.render("locations/listAll", { locations: locations });
  } catch (error) {
    res.render("error", { message: "Error showing all locations", error: error,});
  }
};

//Shows one location
locationController.show = async function (req, res) {
  let id = req.params.id;
  try {
    var location = await Location.findOne({ _id: id });
    res.render("locations/viewDetails", { location: location });
  } catch (error) {
    res.render("error", { message: "Error finding location", error: error });
  }
};

//Location creating form
locationController.formCreate = async function (req, res) {
  res.render("locations/createForm");
};

//Location post
locationController.create = async function (req, res) {
  let body = req.body;
  try {
    var location = await Location.create(body);
    res.redirect("/locations");
  } catch (error) {
    res.render("./error", { message: "Error creating location", error: error });
  }
};

//Location editing form
locationController.formEdit = async function (req, res) {
  let id = req.params.id;
  try {
    var location = await Location.findOne({ _id: id });
    res.render("locations/editDetails", { location: location });
  } catch (error) {
    res.render("./error", { message: "Error finding location", error: error });
  }
};

//Location edit post
locationController.edit = async function (req, res) {
  let body = req.body;
  let id = req.params.id;
  try {
    await Location.findOneAndUpdate({ _id: id }, body);
    res.redirect("/locations/show/" + id);
  } catch (error) {
    res.render("./error", { message: "Error editing location", error: error });
  }
};

//Delete location
locationController.delete = async function (req, res) {
  let id = req.params.id;
  try {
    var events = await Event.find({location: id});
    if (events.length) {
      res.render("./error", { message: "Error deleting location. There are events at this location", error: {} });
    }else {
      await Location.deleteOne({ _id: id });
      res.redirect("/locations");
    }    
  } catch (error) {
    res.render("./error", { message: "Error deleting location", error: error });
  }
};

module.exports = locationController;
