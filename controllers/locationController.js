var mongoose = require("mongoose");
var Location = require("../models/location");

var locationController = {};

locationController.showAll = async function (req, res) {
  try {
    var locations = await Location.find();
    res.render("locations/listAll", { locations: locations });
  } catch (error) {
    res.render("error", { message: "Error showing all locations", error: error,});
  }
};

locationController.show = async function (req, res) {
  let id = req.params.id;
  try {
    var location = await Location.findOne({ _id: id });
    res.render("locations/viewDetails", { location: location });
  } catch (error) {
    res.render("error", { message: "Error finding location", error: error });
  }
};

locationController.formCreate = async function (req, res) {
  res.render("locations/createForm");
};

locationController.create = async function (req, res) {
  let body = req.body;
  try {
    var location = await Location.create(body);
    res.redirect("/locations");
  } catch (error) {
    res.render("./error", { message: "Error creating location", error: error });
  }
};

locationController.formEdit = async function (req, res) {
  let id = req.params.id;
  try {
    var location = await Location.findOne({ _id: id });
    res.render("locations/editDetails", { location: location });
  } catch (error) {
    res.render("./error", { message: "Error finding location", error: error });
  }
};

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

locationController.delete = async function (req, res) {
  let id = req.params.id;
  try {
    var location = await Location.deleteOne({ _id: id });
    res.redirect("/locations");
  } catch (error) {
    res.render("./error", { message: "Error deleting location", error: error });
  }
};

module.exports = locationController;
