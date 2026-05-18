const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

db.query(`
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(100)
)
`);

db.query(`
CREATE TABLE IF NOT EXISTS empresas (
    id SERIAL PRIMARY KEY,
    razao_social VARCHAR(200),
    nome_empresa VARCHAR(200),
    cnpj VARCHAR(30),
    porte VARCHAR(100),
    setor VARCHAR(100),
    cidade VARCHAR(100),
    estado VARCHAR(100),
    colaboradores VARCHAR(50),
    responsavel_ti VARCHAR(100),
    email_responsavel VARCHAR(100),
    telefone_responsavel VARCHAR(50)
)
`);

/* TESTE */
app.get('/', (req, res) => {
    res.send('Backend GreenTech funcionando!');
});

/* CADASTRAR USUÁRIO */
app.post('/usuarios', (req, res) => {

    const { nome, email, senha } = req.body;

    const sql = `
        INSERT INTO usuarios (nome, email, senha)
        VALUES ($1, $2, $3)
    `;

    db.query(sql, [nome, email, senha], (err) => {

        if (err) {
            console.log(err);
            res.status(500).send('Erro ao cadastrar usuário');
            return;
        }

        res.send('Usuário cadastrado!');
    });

});

/* LISTAR EMPRESAS */
app.get('/empresas', (req, res) => {

    db.query('SELECT * FROM empresas', (err, result) => {

        if (err) {
            console.log(err);
            res.status(500).send('Erro ao buscar empresas');
            return;
        }

        res.json(result);
    });
});

/* CADASTRAR EMPRESA */
app.post('/empresas', (req, res) => {

    const {

        razao_social,
        nome_empresa,
        cnpj,
        porte,
        setor,
        cidade,
        estado,
        colaboradores,
        responsavel_ti,
        email_responsavel,
        telefone_responsavel

    } = req.body;

    const sql = `
        INSERT INTO empresas (

            razao_social,
            nome_empresa,
            cnpj,
            porte,
            setor,
            cidade,
            estado,
            colaboradores,
            responsavel_ti,
            email_responsavel,
            telefone_responsavel

        )

        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql, [

        razao_social,
        nome_empresa,
        cnpj,
        porte,
        setor,
        cidade,
        estado,
        colaboradores,
        responsavel_ti,
        email_responsavel,
        telefone_responsavel

    ], (err) => {

        if (err) {
            console.log(err);
            res.status(500).send('Erro ao cadastrar empresa');
            return;
        }

        res.send('Empresa cadastrada!');
    });
});

/* LOGIN */

app.post('/login', (req, res) => {

    const { email, senha } = req.body;

    const sql = `
        SELECT * FROM usuarios
        WHERE email = ? AND senha = ?
    `;

    db.query(sql, [email, senha], (err, result) => {

        if (err) {

            console.log(err);

            res.status(500).send('Erro no servidor');

            return;
        }

        if (result.length > 0) {

            res.json({
                sucesso: true,
                usuario: result[0]
            });

        } else {

            res.status(401).json({
                sucesso: false,
                mensagem: 'E-mail ou senha inválidos'
            });
        }

    });

});

/* PORTA */
app.listen(3001, () => {
    console.log('Servidor GreenTech rodando na porta 3001');
});
