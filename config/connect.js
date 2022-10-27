const connection_string = {
    host     : process.env.DB_HOST,
    user     : process.env.DB_USER,
    password : process.env.DB_PASSWORD || '',
    database : process.env.DB_DATABASE
}

module.exports = {
    connection_string
}