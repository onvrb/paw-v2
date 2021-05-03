var mongoose = require("mongoose");
var User = require("../models/user");
var UserType = require("../models/userType");

var userController = {};

// vai buscar todas as accounts
userController.showAll = async function (req, res) {
  try {
    var users = await User.find().populate('type');
    res.render("users/listAll", { users: users });
  } catch (error) {
    res.render("error", { message: "Error finding users", error: error });
  }
};

// vai buscar account por id
userController.show = async function (req, res) {
  let id = req.params.id;
  try {
    var user = await User.findOne({ _id: id }).populate('type');
    console.log(user);
    res.render("users/viewDetails", { user: user });
  } catch (error) {
    res.render("error", { message: "Error finding user", error: error });
  }
};


userController.formCreate = async function (req, res) {
  try {
    var userTypes = await UserType.find();
    res.render("users/createForm", { userTypes: userTypes });
  } catch (error) {
    res.render("error", { message: "Error finding user types", error: error });
  }
};

userController.create = async function (req, res) {
  try {
    var user;
    var email = req.body.email;
    user = await User.findOne({ email: email });
    if (user) {
      res.render("error", { message: "Email already exists", error: {} });
    } else {
      var body = req.body;
      body.covid = false;
      body.banned = false;
      console.log(body)
      user = await new User(req.body).save();
      res.redirect("/users");
    }
  } catch (error) {
    res.render("error", { message: "Error registering user", error: error });
  }
};

// mostra 1 account para edicao
userController.formEdit = async function (req, res) {
  try {
    var id = req.params.id;
    var user = await User.findOne({ _id: id });
    if (user) {
      res.render("users/editDetails", { user: user });
    }
  } catch (error) {
    res.render("error", {
      message: "Error retrieving user edit form",
      error: error,
    });
  }
};

// edita 1 account como resposta a um post de um form editar
userController.edit = async function (req, res) {
  let body = req.body;
  let id = req.params.id;
  try {
      console.log(body)
    body.covid ? body.covid = true : body.covid = false;
    body.banned ? body.banned = true : body.banned = false;
    await User.findOneAndUpdate({ _id: id }, body);
    res.redirect("/users/show/" + id);
  } catch (error) {
    res.render("./error", { message: "Error editing user", error: error });
  }
};

// apaga uma conta por id
userController.delete = async function (req, res) {
  let id = req.params.id;
  try {
    var user = await User.deleteOne({ _id: id });
    res.redirect("/users");
  } catch (error) {
    res.render("./error", { message: "Error deleting user", error: error });
  }
};

module.exports = userController;
