var express = require("express");
var router = express.Router();
var backofficeController = require("../controllers/backofficeController");

router.get("/", backofficeController.showAll);
router.get("/show/:id", backofficeController.show);
router.get("/create", backofficeController.formCreate); //res.render("accounts/createForm");
router.post("/create", backofficeController.create); //create
router.get("/edit/:id", backofficeController.formEdit); //formEdit
router.post("/edit/:id", backofficeController.edit); //edit
router.get("/delete/:id", backofficeController.delete);

module.exports = router;
