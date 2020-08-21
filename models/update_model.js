const db = require('./connection_db');

module.exports = function customerEdit(id, memberUpdateData){
    let request ={};
    return new Promise((resolve, reject) =>{
        db.query('update member_info set ? where id =?', [memberUpdateData,id],
        function(err, rows){
            if(err){
                console.log(err);
                result.status ="會員資料更新失敗。";
                rusult.err = "伺服器錯誤，請稍後在試！";
                ruject(result);
            }
            result.status ="會員資料更新成功。";
            result.memberUpdateData = memberUpdateData;
            resolve(result);

        })
        
    })

};