-- Arquivo de apoio, caso você queira criar tabelas como as aqui criadas para a API funcionar.
-- Você precisa executar os comandos no banco de dados para criar as tabelas,
-- ter este arquivo aqui não significa que a tabela em seu BD estará como abaixo!

/*
comandos para mysql server
*/
/* comando para criar o usuario */

CREATE USER 'mix'@'localhost' IDENTIFIED BY '45112784';

GRANT SELECT, INSERT, UPDATE ON mixtape.* TO 'mix'@'localhost';

FLUSH PRIVILEGES;

/* script do banco */

CREATE DATABASE mixtape;
USE mixtape;

create table usuario(
	idUsuario int primary key auto_increment,
    nome varchar(45),
    email varchar(45),
    senha varchar(45),
    dataCadastro datetime default current_timestamp
);

