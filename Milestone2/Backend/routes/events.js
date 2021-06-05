var express = require('express');
var router = express.Router();
var eventController = require('../controllers/eventController');
var userController = require("../controllers/userController");

router.get('/', userController.verifyToken, eventController.showAll);
router.get('/show/:id', userController.verifyToken, eventController.show);
router.post('/', userController.verifyToken, eventController.create);
router.put('/:id', userController.verifyToken, eventController.edit);
router.delete('/:id', userController.verifyToken, eventController.delete);

module.exports = router;