const db = require('./connection_db');

module.exports = function register(memberData) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('select email from member_info where email = ?',memberData.email, function(err, rows){
            if(err){
                console.log(err);
                result.status ="註冊失敗"
                result.err = "伺服器錯誤，請稍候再試！"
                reject(result);
                return;
            }
            if(rows.length >= 1){
                result.status = "註冊失敗";
                result.err = "已有重複的 Email"
                reject(result);
            }else{
                //無重複資料，寫入資料庫
                db.query('insert into member_info set ?', memberData, function(err, rows){
                    if(err){
                        console.log(err);
                        result.status ="註冊失敗"
                        result.err = "伺服器錯誤，請稍候再試！"
                        reject(result);
                        return;
                    }
                    result.status ="註冊成功"
                    result.registerMember = memberData;
                    resolve(result);
                })
            }
        });


    })
    
}