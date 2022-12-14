const connection_string = {
    host     : process.env.MYSQLHOST || 'localhost',
    user     : process.env.MYSQLUSER || 'root',
    password : process.env.MYSQLPASSWORD || '',
    database : process.env.MYSQLDATABASE || 'escritos',
    port: process.env.MYSQLPORT || 3306,
    ssl: {
        rejectUnauthorized: false
    }

    /*host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'escritos',
    port: 3306*/
    
}

module.exports = {
    connection_string
}