var express = require('express');
var router = express.Router();
var controller = require('../controllers/events');

router.param('event', controller.set_event);

router.param('item', controller.set_item);

router.get('/', controller.get_all);

router.post('/create', controller.create);

router.get('/:event', controller.get_event);

router.post('/:event/items', controller.create_item);

module.exports = router;