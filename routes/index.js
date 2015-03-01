var express = require('express');
var router = express.Router();
var controller = require('../controllers/application');

router.get('/', controller.get_index);

module.exports = router;