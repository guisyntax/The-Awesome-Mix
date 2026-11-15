var express = require("express");
var router = express.Router();

var mixController = require("../src/mixController");

router.get("/faixas/:idUsuario", function (req, res) {
    mixController.listarFaixas(req, res);
});

router.get("/albuns/:idUsuario", function (req, res) {
    mixController.listarAlbuns(req, res);
});

router.get("/dias/:idUsuario", function (req, res) {
    mixController.listarDias(req, res);
});

router.post("/reproducoes", function (req, res) {
    mixController.registrar(req, res);
});

module.exports = router;
