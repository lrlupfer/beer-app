//setup mysql
var mysql = require('mysql');

var connection = mysql.createConnection({
    port: 3306,
    host: 'localhost',
    user: 'root',
    password: '',
    
    //  ****   important!!! **** get database name!! ***** //
    database: 'XXXXXXX'
});
//make connection
connection.connect(function(err){
    if (err) {
        console.error('Error, no connection. This is the problem: ' + err.stack);
        return;
    }
    console.log('Connected. Hello visitor #' + connection.threadId);
});
//export connection for ORM use.
module.exports = connection;