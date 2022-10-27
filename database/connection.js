const mysql = require('mysql');
const { connection_string } = require('../config/connect');
const connection  = mysql.createPool({
  connectionLimit : 10,
  ...connection_string
});

/*const mysql = require('mysql');
const {connection_string} = require('../config/connect')

const connection = mysql.createConnection(connection_string);

connection.connect((err)=>{
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }   
    console.log('connected as id ' + connection.threadId);
});*/
 
module.exports = {
  connection
}