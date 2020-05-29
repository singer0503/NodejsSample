var express = require('express');
var router = express.Router();
// 接收 post 資料
router.post('/', function(req, res, next) {
  console.log(req.body.test)
  res.json({'message':'ok'})
});

module.exports = router;