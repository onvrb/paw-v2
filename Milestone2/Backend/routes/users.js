var express = require("express");
var router = express.Router();
var userController = require("../controllers/userController");

router.get("/", userController.verifyToken, userController.verifyRoleAdmin, userController.showAll);
router.get("/show/:id", userController.show);
router.get("/create", userController.formCreate); //res.render("accounts/createForm");
router.post("/create", userController.create); //create
router.get("/edit/:id", userController.formEdit); //formEdit
router.post("/edit/:id", userController.edit); //edit
router.get("/delete/:id", userController.delete);

module.exports = router;
