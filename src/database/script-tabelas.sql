CREATE USER 'mix'@'localhost' IDENTIFIED BY '45112784';

GRANT SELECT, INSERT, UPDATE ON mixtape.* TO 'mix'@'localhost';

FLUSH PRIVILEGES;

CREATE DATABASE mixtape;
USE mixtape;

create table usuario(
	idUsuario int primary key auto_increment,
    nome varchar(45),
    email varchar(45),
    senha varchar(45),
    dataCadastro datetime default current_timestamp
);

