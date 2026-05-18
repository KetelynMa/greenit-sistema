CREATE DATABASE IF NOT EXISTS greenit_v2;

USE greenit_v2;

/* USUÁRIOS */
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100),
    email VARCHAR(100),
    senha VARCHAR(100)
);

/* EMPRESAS */
CREATE TABLE empresas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome_empresa VARCHAR(150),
    porte VARCHAR(100),
    setor VARCHAR(100),
    colaboradores INT,
    responsavel_ti VARCHAR(100)
);

/* ATIVOS */
CREATE TABLE ativos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_ativo VARCHAR(100),
    quantidade INT,
    idade_media INT,
    status_ativo VARCHAR(100)
);

/* MATURIDADE */
CREATE TABLE maturidade (
    id INT AUTO_INCREMENT PRIMARY KEY,
    governanca INT,
    eficiencia INT,
    monitoramento INT,
    ciclo_vida INT,
    cultura INT,
    nivel_final VARCHAR(100)
);

/* QUIZ */
CREATE TABLE quiz (
    id INT AUTO_INCREMENT PRIMARY KEY,
    pergunta VARCHAR(255)
);

/* TREINAMENTOS */
CREATE TABLE treinamentos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150),
    descricao TEXT
);
