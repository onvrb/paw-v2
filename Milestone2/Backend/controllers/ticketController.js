// not finished
// o que seria melhor: separar controller em serviços? 

var mongoose = require("mongoose");
var Ticket = require("../models/ticket");

var ticketController = {};

// vai buscar todos os bilhetes
ticketController.showAll = function () {
  return Location.find();
};

// vai buscar bilhete por id
ticketController.show = function (id) {
  return Location.findOne({ _id: id });
};

// cria bilhete
ticketController.create = function (body) {
  return Location.create(body);
};

// mostra 1 bilhete para edicao
ticketController.edit = function (id, body) {
  return Location.findOneAndUpdate({ _id: id }, body);
};


// apaga um bilhete por id
ticketController.delete = function (id) {
  return Location.deleteOne({ _id: id });
};

module.exports = ticketController;
