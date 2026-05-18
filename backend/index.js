const express = require('express');
const cors = require('cors');
const db = require('./db');

const app = express();

app.use(cors());
app.use(express.json());

/* CRIAR TABELAS */

db.query(`
CREATE TABLE IF NOT EXISTS usuarios (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100) UNIQUE,
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

    const nome = req.body.nome.trim();
    const email = req.body.email.trim();
    const senha = req.body.senha.trim();

    const sql = `
        INSERT INTO usuarios (nome, email, senha)
        VALUES ($1, $2, $3)
    `;

    db.query(sql, [nome, email, senha], (err) => {

        if (err) {

            console.log(err);

            if (err.code === '23505') {

                res.status(400).send('Usuário já cadastrado');
                return;
            }

            res.status(500).send('Erro ao cadastrar usuário');
            return;
        }

        res.send('Usuário cadastrado!');

    });

});

/* LOGIN */

app.post('/login', (req, res) => {

    const email = req.body.email.trim();
    const senha = req.body.senha.trim();

    const sql = `
        SELECT * FROM usuarios
        WHERE LOWER(email) = LOWER($1) AND senha = $2
    `;

    db.query(sql, [email, senha], (err, result) => {

        if (err) {
            console.log(err);
            res.status(500).send('Erro no servidor');
            return;
        }

        if (result.rows.length > 0) {
            res.json({
                sucesso: true,
                usuario: result.rows[0]
            });
        } else {
            res.status(401).json({
                sucesso: false,
                mensagem: 'E-mail ou senha inválidos'
            });
        }

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

        res.json(result.rows);

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

        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
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

/* ALTERAR SENHA */

app.put('/alterar-senha', (req, res) => {

    const email = req.body.email.trim();
    const novaSenha = req.body.novaSenha.trim();

    const sql = `
        UPDATE usuarios
        SET senha = $1
        WHERE LOWER(email) = LOWER($2)
    `;

    db.query(sql, [novaSenha, email], (err, result) => {

        if (err) {
            console.log(err);
            res.status(500).send('Erro ao alterar senha');
            return;
        }

        if (result.rowCount === 0) {
            res.status(404).send('Usuário não encontrado');
            return;
        }

        res.send('Senha alterada com sucesso!');

    });

});

/* PORTA */

app.listen(3001, () => {
    console.log('Servidor GreenTech rodando na porta 3001');
});
