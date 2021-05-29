var express = require("express");
var router = express.Router();
var locationController = require("../controllers/locationController");

//ShowAll
// mostra todos locations
router.get("/", locationController.showAll);
router.get("/show/:id", locationController.show);
router.post("/create", locationController.create);
router.get("/edit/:id", locationController.formEdit);
router.post("/edit/:id", locationController.edit);
router.get("/delete/:id", locationController.delete);

module.exports = router;
