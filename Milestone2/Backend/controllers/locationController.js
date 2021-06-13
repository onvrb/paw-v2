var Location = require("../models/location");

var locationController = {};

locationController.showAll = async function (req, res) {
  try {
    var locations = await Location.find();
    res.status(200).jsonp({ locations: locations });
  } catch (error) {
    res.status(500).jsonp({ message: "Error showing all locations", error: error, });
  }
};

locationController.show = async function (req, res) {
  try {
    let id = req.params.id;
    var location = await Location.findOne({ _id: id });
    res.status(200).jsonp({ location: location });
  } catch (error) {
    res.status(500).jsonp({ message: "Error finding location", error: error });
  }
};

locationController.create = async function (req, res) {
  try {
    var location = await Location.create(req.body);
    res.status(200).jsonp({ location: location });
  } catch (error) {
    res.status(500).jsonp({ message: "Error creating location", error: error });
  }
};

locationController.edit = async function (req, res) {
  try {
    var location = await Location.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).jsonp({ location: location });
  } catch (error) {
    res.status(500).jsonp({ message: "Error editing location", error: error });
  }
};

locationController.delete = async function (req, res) {
  try {
    var location = await Location.deleteOne({ _id: req.params.id });
    res.status(200).jsonp({ location: location });
  } catch (error) {
    res.status(500).jsonp({ message: "Error deleting location", error: error });
  }
};

module.exports = locationController;
