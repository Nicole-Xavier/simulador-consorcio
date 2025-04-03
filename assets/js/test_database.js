const pool = require('./database');

async function testConnection() {
    try{
        const res = await pool.query('SELECT NOW()');
        console.log('Conexão bem-sucedida! Hora atual do banco:', res.rows[0]);
    } catch (err) {
        console.error('Erro na conexão:',err);
    } finally{
        pool.end;
    }
}

testConnection();