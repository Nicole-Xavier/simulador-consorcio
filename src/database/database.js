require('dotenv').config();

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

pool.on('connect', () => {
    console.log('Conectado ao banco de dados PostgreSQL.');
});

pool.on('error', (err) => {
    console.log('Erro inesperado no pool de conexões:', err);
    process.exit(-1);
})

module.exports = pool;

