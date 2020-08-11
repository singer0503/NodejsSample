var express = require('express');
var router = express.Router();


const MemberModifyMethod = require('../controllers/modify_controller');
// 這段就是這沒錯 把 MemberModifyMethod 弄出來
memberModifyMethod = new MemberModifyMethod();

// 這裡記得要加上「斜線/」 不然只有register 會無做用
router.post('/register', memberModifyMethod.postRegister);

router.post('/login', memberModifyMethod.postLogin);

// 因為 javascript 是一行一行執行，若開一開始就 exports 出去就會沒動作
module.exports = router;