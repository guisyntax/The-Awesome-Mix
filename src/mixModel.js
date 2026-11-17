var database = require("../src/database/config");

function listarFaixas(idUsuario) {
    var instrucaoSql = `
        select m.idMusica, m.titulo, m.artista, m.arquivo, m.origem,
               a.nome as album, a.capa,
               count(r.idReproducao) as total
        from musica m
        join album a on a.idAlbum = m.fkAlbum
        left join reproducao r on r.fkMusica = m.idMusica and r.fkUsuario = ${idUsuario}
        group by m.idMusica, a.idAlbum
        order by total desc, m.titulo;
    `;

    return database.executar(instrucaoSql);
}


function listarDias(idUsuario) {
    var instrucaoSql = `
        select date_format(ouvidoEm, '%d/%m') as dia, count(*) as total
        from reproducao
        where fkUsuario = ${idUsuario}
        and ouvidoEm >= date_sub(curdate(), interval 6 day)
        group by dia
        order by min(ouvidoEm);
    `;

    return database.executar(instrucaoSql);
}

function registrar(idUsuario, idMusica) {
    var instrucaoSql = `
        insert into reproducao (fkUsuario, fkMusica) values (${idUsuario}, ${idMusica});
    `;

    return database.executar(instrucaoSql);
}

module.exports = {
    listarFaixas,
    listarDias,
    registrar
};
