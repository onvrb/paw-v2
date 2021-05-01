var mongoose = require("mongoose");
var Location = require("../models/location");

var locationController = {};

// vai buscar todas as locations
locationController.showAll = function () {
  return Location.find();
};

// vai buscar location por id
locationController.show = function (id) {
  return Location.findOne({ _id: id });
};

// cria location
locationController.create = function (body) {
  return Location.create(body);
};

// mostra 1 location para edicao
locationController.edit = function (id, body) {
  return Location.findOneAndUpdate({ _id: id }, body);
};


// apaga uma conta por id
locationController.delete = function (id) {
  return Location.deleteOne({ _id: id });
};

module.exports = locationController;
