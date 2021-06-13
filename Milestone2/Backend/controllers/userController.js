var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var config = require('../authconfig');

var User = require("../models/user");
var UserType = require("../models/userType");

var userController = {};

userController.showAll = async function (req, res) {
  try {
    var query = req.query;
    var users = await User.find(query).populate("type"); //popular o campo type com informação
    res.status(200).jsonp({ users: users });
  } catch (error) {
    res.status(500).render({ message: "Error finding users", error: error });
  }
}

userController.show = async function (req, res) {
  try {
    let id = req.params.id;
    var user = await User.findOne({ _id: id }).populate("type"); //popular o campo type com informação
    res.status(200).jsonp({ user: user });
  } catch (error) {
    res.status(500).jsonp({ message: "Error finding user", error: error });
  }
}

userController.getUserTypes = async function (req, res) {
  try {
    var users = await UserType.find();
    res.status(200).jsonp({ user_types: users });
  } catch (error) {
    res.status(500).render({ message: "Error finding user_types", error: error });
  }
}

userController.getUserByType = async function (req, res) {
  try {
    let id = req.params.id;
    console.log(id)
    var users = await User.find({ type: id });
    res.status(200).jsonp({ users: users });
  } catch (error) {
    res.status(500).render({ message: "Error finding users", error: error });
  }
}

userController.register = async function (req, res) {
  try {
    var hashedPass = bcrypt.hashSync(req.body.password, 8);
    req.body.password = hashedPass;
    var type = await UserType.findOne({ type: req.body.type });
    req.body.type = type;
    var user = await new User(req.body).save();

    if (user != null) {
      var token = jwt.sign({ id: user._id }, config.secret, { expiresIn: 86400 });
      res.status(200).jsonp({ user: user, token: token });
    }
  } catch (error) {
    res.jsonp({ message: "Error registering user", error: error });
  }
}

userController.login = async function (req, res) {
  try {
    var user = await User.findOne({ email: req.body.email }).populate("type");

    if (user == null)
      res(404).jsonp({});

    var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid)
      return res.status(401).send({ auth: false, token: null });

    var token = jwt.sign({ id: user._id }, config.secret, {
      expiresIn: 86400
    });
    return res.status(200).send({ auth: true, token: token, user: user });
  } catch (err) {
    return res.status(500).jsonp({ message: "Error logging in user.", error: err })
  }
}

userController.logout = function (req, res) {
  try {
    res.status(200).send({ auth: false, token: null });
  } catch (error) {
    res.jsonp({ message: "Error logout user", error: error });
  }
}

userController.edit = async function (req, res) {
  try {
    var id = req.params.id;
    var types;
    if (req.body.type) {
      type = await UserType.findOne({ type: req.body.type });
      req.body.type = type;
    }
    var user = await User.findOneAndUpdate({ _id: id }, body);
    if (!user)
      res.status(404).jsonp({});
    res.status(200).jsonp({ user: user });
  } catch (error) {
    res.jsonp({ message: "Error editing user", error: error });
  }
};

userController.delete = async function (req, res) {
  try {
    let id = req.params.id;
    var user = await User.deleteOne({ _id: id });
    res.status(200).jsonp({ user: user });
  } catch (error) {
    res.status(500).jsonp({ message: "Error deleting user", error: error });
  }
};

/**
 * AUTHENTICATION
 */

userController.verifyToken = function (req, res, next) {
  var token = req.headers['authorization'];
  console.log(token)
  if (token == null)
    return res.status(403).send({ auth: false, message: "No token provided." });

  jwt.verify(token, config.secret, function (err, decoded) {
    if (err)
      return res
        .status(500)
        .send({ auth: false, message: "Failed to authenticate token." });

    req.userId = decoded.id;

    next();
  });
};

userController.verifyRoleAdmin = function (req, res, next) {
  User.findById(req.userId, function (err, user) {
    console.log(user);
    if (err)
      return res.status(500).jsonp({ message: "There was a problem finding the user.", error: err });

    if (!user)
      return res.status(404).jsonp({ message: "No user found." });

    if (user.UserType.type == "Admin")
      next();
    else
      return res.status(403).jsonp({ auth: false, message: "Not authorized!" });
  });
};

module.exports = userController;
