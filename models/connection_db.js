// DataBase
const config = require('../config/development_config');
const mysqlt = require("mysql");

const connection = mysqlt.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
});
// 可以印出連線資訊
//console.log(connection);

connection.connect(err => {
  if (err) {
    
    console.log('connecting error');
    console.log(err);
  } else {
    console.log('connecting MySQL Success!');
  }
});

module.exports = connection;