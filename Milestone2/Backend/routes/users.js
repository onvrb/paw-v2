var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

router.get("/", userController.showAll);
router.get("/:id", userController.verifyToken, userController.show);
router.post("/login", userController.login);
router.post("/register", userController.register);
router.post("/logout", userController.logout);
router.put("/:id", userController.verifyToken, userController.edit);
router.delete("/:id", userController.verifyToken, userController.verifyRoleAdmin, userController.delete); //inactive

module.exports = router;
