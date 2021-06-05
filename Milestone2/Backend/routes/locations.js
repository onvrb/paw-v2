var express = require("express");
var router = express.Router();
var locationController = require("../controllers/locationController");
var userController = require("../controllers/userController");

router.get("/", userController.verifyToken, locationController.showAll);
router.get("/:id", userController.verifyToken, locationController.show);
router.post("/", userController.verifyToken, locationController.create);
router.put("/:id", userController.verifyToken, locationController.edit);
router.delete("/:id", userController.verifyToken, locationController.delete);

module.exports = router;
