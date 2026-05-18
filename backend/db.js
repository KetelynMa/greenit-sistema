const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://greenit_db_96re_user:9oS4GDqwM7k5qlGM5S0zx5sM9OVCZy7s@dpg-d858qleq1p3s73f233sg-a.oregon-postgres.render.com/greenit_db_96re',
    ssl: {
        rejectUnauthorized: false
    }
});

pool.connect()
    .then(() => {
        console.log('PostgreSQL conectado!');
    })
    .catch((err) => {
        console.error('Erro PostgreSQL:', err);
    });

module.exports = pool;

