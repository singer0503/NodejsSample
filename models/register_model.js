const db = require('./connection_db');

module.exports = function register(memberData) {
    let result = {};
    return new Promise((resolve, reject) => {
        db.query('insert into member_info set ?', memberData, function(err, rows){
            if(err){
                console.log(err);
                result.status ="註冊失敗"
                result.err = "伺服器錯誤，請稍候再試！"
                reject(result);
                return;
            }
            result.registerMember = memberData;
            resolve(result);
        })
    })
    
}