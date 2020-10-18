
const pg = require('pg')


const pool = new pg.Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Trabalho_Final',
    password: 'alunoufc',
    port: 5432,
})

module.exports = pool