const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'host.docker.internal',
    user: 'root',
    password: '123456',
    database: 'greenit',
    port: 3307
});

connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar no MySQL:', err);
        return;
    }

    console.log('Banco Green IT conectado!');
});

module.exports = connection;
