var express = require('express');
var router = express.Router();

// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

module.exports = router;

const IndexController = require('../controllers/modify_controller');

indexController = new IndexController();

router.get('/', indexController.sayHiController);