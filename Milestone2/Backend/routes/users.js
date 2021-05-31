var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

router.get("/", userController.showAll);
router.get("/:id", userController.verifyToken, userController.show);
router.post("/register", userController.register);
router.post("/edit/:id", userController.verifyToken, userController.edit);
router.get("/delete/:id", userController.verifyToken, userController.verifyRoleAdmin, userController.delete); //inactive

module.exports = router;
