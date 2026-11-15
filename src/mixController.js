var mixModel = require("../src/mixModel");

function listarFaixas(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (isNaN(idUsuario)) {
        return res.status(400).send("O id do usuário é inválido!");
    }

    mixModel.listarFaixas(idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao listar as faixas:", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarAlbuns(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (isNaN(idUsuario)) {
        return res.status(400).send("O id do usuário é inválido!");
    }

    mixModel.listarAlbuns(idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao listar os álbuns:", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function listarDias(req, res) {
    var idUsuario = Number(req.params.idUsuario);

    if (isNaN(idUsuario)) {
        return res.status(400).send("O id do usuário é inválido!");
    }

    mixModel.listarDias(idUsuario)
        .then(function (resultado) {
            res.json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao listar os dias:", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage);
        });
}

function registrar(req, res) {
    var idUsuario = Number(req.body.idUsuarioServer);
    var idMusica = Number(req.body.idMusicaServer);

    if (isNaN(idUsuario) || isNaN(idMusica)) {
        return res.status(400).send("Usuário ou música inválidos!");
    }

    mixModel.registrar(idUsuario, idMusica)
        .then(function (resultado) {
            res.status(201).json(resultado);
        })
        .catch(function (erro) {
            console.log("Erro ao registrar a reprodução:", erro.sqlMessage || erro);
            res.status(500).json(erro.sqlMessage);
        });
}

module.exports = {
    listarFaixas,
    listarAlbuns,
    listarDias,
    registrar
};
