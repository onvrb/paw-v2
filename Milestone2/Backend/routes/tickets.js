var express = require("express");
var router = express.Router();
var ticketController = require("../controllers/ticketController");
var userController = require("../controllers/userController");

router.get("/", userController.verifyToken, ticketController.showAll);
router.get("/:id", userController.verifyToken, ticketController.show);
router.post("/", userController.verifyToken, ticketController.create);
router.put("/:id", userController.verifyToken, ticketController.edit);
router.delete("/:id", userController.verifyToken, ticketController.delete);

module.exports = router;
