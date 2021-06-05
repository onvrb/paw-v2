var Ticket = require("../models/ticket");

var ticketController = {};

ticketController.showAll = async function (req, res) {
  try {
    var tickets = await Ticket.find();
    res.status(200).jsonp({ ticket: tickets });
  } catch (error) {
    res.status(500).jsonp({ message: "Error getting tickets", error: error });
  }
  return
};

ticketController.show = async function (req, res) {
  try {
    var ticket = await Ticket.findOne({ _id: req.params.id });
    res.status(200).jsonp({ ticket: ticket });
  } catch (error) {
    res.status(500).jsonp({ message: "Error getting ticket", error: error });
  }
};

ticketController.create = async function (req, res) {
  try {
    var ticket = await Ticket.create(req.body);
    res.status(200).jsonp({ ticket: ticket });
  } catch (error) {
    res.status(500).jsonp({ message: "Error creating ticket", error: error });
  }
};

ticketController.edit = async function (req, res) {
  try {
    var ticket = await Ticket.findOneAndUpdate({ _id: req.params.id }, req.body);
    res.status(200).jsonp({ ticket: ticket });
  } catch (error) {
    res.status(500).jsonp({ message: "Error editing ticket", error: error });
  }
};

ticketController.delete = async function (req, res) {
  try {
    var ticket = await Ticket.deleteOne({ _id: req.params.id });
    res.status(200).jsonp({ ticket: ticket });
  } catch (error) {
    res.status(500).jsonp({ message: "Error deleting ticket", error: error });
  }
};

module.exports = ticketController;
