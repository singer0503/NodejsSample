const db = require('./connection_db');

module.exports = function memberLogin(memberData) {
    let result ={};
    return new Promise((resolve, reject) => {
        // 搜尋帳號以及密碼
        db.query('select * from member_info where email = ? and password = ?', [memberData.email, memberData.password], function(err,rows){
            if(err){
                result.status ="登入失敗"
                result.err = "伺服器錯誤，請稍候再試"
                reject(result);
                return;
            }
            resolve(rows);
        });
    }); 
}