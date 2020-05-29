var express = require('express');
var router = express.Router();
// 接收 post 資料
router.post('/', function(req, res, next) {
  console.log(req.body.test)
  const memberData = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    create_date: onTime()
  }
  
  res.json(memberData)
});

module.exports = router;



//取得現在時間，並將格式轉成YYYY-MM-DD HH:MM:SS
const onTime = () => {
  const date = new Date();
  const mm = date.getMonth() + 1;
  const dd = date.getDate();
  const hh = date.getHours();
  const mi = date.getMinutes();
  const ss = date.getSeconds();

  return [date.getFullYear(), "-" +
      (mm > 9 ? '' : '0') + mm, "-" +
      (dd > 9 ? '' : '0') + dd, " " +
      (hh > 9 ? '' : '0') + hh, ":" +
      (mi > 9 ? '' : '0') + mi, ":" +
      (ss > 9 ? '' : '0') + ss
  ].join('');
}