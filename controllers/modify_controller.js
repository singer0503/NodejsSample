const toRegister = require('../models/register_model');

module.exports = class Member{
    
    postRegister(req, res, next){
    
        const memberData = {
            name: req.body.name, 
            email: req.body.email,
            password: req.body.password,
            create_date: onTime()
        }
        // 將資料寫入資料庫
        toRegister(memberData).then(result => {
            // 若寫入成功則回傳
            res.json({
                status: "註冊成功。",
                result: result 
            })
        }, (err) => {
            // 若寫入失敗則回傳
            res.json({
                result: err
            })
        })
    }
}

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