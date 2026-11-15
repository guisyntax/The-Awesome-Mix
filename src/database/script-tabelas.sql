CREATE USER 'mix'@'localhost' IDENTIFIED BY '45112784';

GRANT SELECT, INSERT, UPDATE ON mixtape.* TO 'mix'@'localhost';

FLUSH PRIVILEGES;

create database mixtape;
use mixtape;
			 
create table usuario(
	idUsuario int primary key auto_increment,
    nome varchar(45),
    email varchar(45),
    senha varchar(45),
    dataCadastro datetime default current_timestamp
);

create table album(
	idAlbum int auto_increment primary key,
    nome varchar(45) not null,
    capa varchar(255) not null
);

create table musica (
    idMusica int auto_increment primary key,
    titulo varchar(45) not null,
    artista varchar(45) not null,
    arquivo varchar(255) not null,
    origem varchar(45) not null,
    fkAlbum int,
    constraint fkMusicaAlbum foreign key (fkAlbum) references album(idAlbum),
    constraint chkOrigem check (origem in ('Guilherme', 'Peter'))
);

create table reproducao (
    idReproducao int auto_increment primary key,
    fkUsuario int not null,
    fkMusica int not null,
    ouvidoEm datetime default current_timestamp,
    foreign key (fkUsuario) references usuario(idUsuario),
    foreign key (fkMusica) references musica(idMusica)
);

insert into album (idAlbum, nome, capa) values
(1, 'American Pie', 'assets/img/capas/american-pie.jpg'),
(2, 'Best of Blondie', 'assets/img/capas/best-of-blondie.jpg'),
(3, 'Come and Get Your Love', 'assets/img/capas/come-and-get-your-love.jpg'),
(4, 'Songs from the Big Chair', 'assets/img/capas/songs-from-the-big-chair.jpg'),
(5, 'Out of the Blue', 'assets/img/capas/out-of-the-blue.jpg'),
(6, 'Appetite for Destruction', 'assets/img/capas/appetite-for-destruction.jpg'),
(7, 'Non-Stop Erotic Cabaret', 'assets/img/capas/non-stop-erotic-cabaret.jpg'),
(8, 'Rhino Hi-Five: A-Ha', 'assets/img/capas/rhino-hi-five-a-ha.jpg'),
(9, 'An Innocent Man', 'assets/img/capas/an-innocent-man.jpg'),
(10, 'Past, Present & Future', 'assets/img/capas/past-present-and-future.jpg'),
(11, 'Bark at the Moon', 'assets/img/capas/bark-at-the-moon.jpg'),
(12, 'Marcos Valle', 'assets/img/capas/marcos-valle.jpg'),
(13, 'Road to Ruin', 'assets/img/capas/road-to-ruin.jpg'),
(14, 'Going Up', 'assets/img/capas/going-up.jpg'),
(15, 'Around the Fur', 'assets/img/capas/around-the-fur.jpg');

insert into musica (titulo, artista, arquivo, origem, fkAlbum) values
('American Pie', 'Don McLean', 'assets/audio/peter/american-pie.mp3', 'Peter', 1),
('Call Me', 'Blondie', 'assets/audio/peter/call-me.mp3', 'Peter', 2),
('Come and Get Your Love', 'Redbone', 'assets/audio/peter/come-and-get-your-love.mp3', 'Peter', 3),
('Everybody Wants to Rule the World', 'Tears for Fears', 'assets/audio/peter/everybody-wants-to-rule-the-world.mp3', 'Peter', 4),
('Mr. Blue Sky', 'Electric Light Orchestra', 'assets/audio/peter/mr-blue-sky.mp3', 'Peter', 5),
('Sweet Child O'' Mine', 'Guns N'' Roses', 'assets/audio/peter/sweet-child-o-mine.mp3', 'Peter', 6),
('Tainted Love', 'Soft Cell', 'assets/audio/peter/tainted-love.mp3', 'Peter', 7),
('Take On Me', 'a-ha', 'assets/audio/peter/take-on-me.mp3', 'Peter', 8),
('Uptown Girl', 'Billy Joel', 'assets/audio/peter/uptown-girl.mp3', 'Peter', 9),
('Are You Satisfied?', 'The Rah Band', 'assets/audio/guilherme/are-you-satisfied.mp3', 'Guilherme', 10),
('Bark at the Moon', 'Ozzy Osbourne', 'assets/audio/guilherme/bark-at-the-moon.mp3', 'Guilherme', 11),
('Estrelar', 'Marcos Valle', 'assets/audio/guilherme/estrelar.mp3', 'Guilherme', 12),
('I Wanna Be Sedated', 'Ramones', 'assets/audio/guilherme/i-wanna-be-sedated.mp3', 'Guilherme', 13),
('Messages from the Stars', 'The Rah Band', 'assets/audio/guilherme/message-from-the-stars.mp3', 'Guilherme', 14),
('My Own Summer (Shove It)', 'Deftones', 'assets/audio/guilherme/my-own-summer.mp3', 'Guilherme', 15);