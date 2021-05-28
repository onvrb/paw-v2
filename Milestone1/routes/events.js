var express = require('express');
var router = express.Router();
var eventController = require('../controllers/eventController');

router.get('/', eventController.showAll );
router.get('/show/:id', eventController.show );
router.get('/create', eventController.formCreate);
router.post('/create', eventController.create);
router.get('/edit/:id', eventController.formEdit);
router.post('/edit/:id', eventController.edit);
router.get('/delete/:id', eventController.delete );

module.exports = router;