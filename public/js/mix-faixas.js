let faixas = [];
let dias = [];
let idTocando = 0;
let jaRegistrou = false;

function carregarDados() {
    fetch(`/mix/faixas/${idUsuario}`).then(function (resposta) {
        resposta.json().then(function (json) {
            faixas = json;
            desenhar();
        });
    }).catch(function (erro) {
        console.log(erro);
    });

    fetch(`/mix/dias/${idUsuario}`).then(function (resposta) {
        resposta.json().then(function (json) {
            dias = json;
            desenhar();
        });
    }).catch(function (erro) {
        console.log(erro);
    });
}

function desenhar() {
    desenharLista();
    desenharMusicaMaisOuvida();
    desenharPeterVsMinhas(faixas);
    desenharUltimosDias();
}

function desenharLista() {
    let posicao = 0;
    let maior = 0;
    let soma = 0;
    let html = "";

    for (let i = 0; i < faixas.length; i++) {
        let item = faixas[i];

        if (filtroAtual == "todos" || item.origem == filtroAtual) {
            posicao++;
            soma += item.total;

            if (posicao == 1) {
                maior = item.total;
            }

            let porcentagem = 0;

            if (maior > 0) {
                porcentagem = item.total / maior * 100;
            }

            let classe = "linha " + item.origem;

            if (item.idMusica == idTocando) {
                classe += " tocando";
            }

            html += `
                <div class="${classe}">
                    <span class="pos">${posicao}</span>
                    <button class="play" onclick="tocar(${item.idMusica})">▶</button>
                    <img class="capa" src="${item.capa}" alt="Capa de ${item.album}">
                    <div class="info">
                        <b>${item.titulo}</b>
                        <span>${item.artista} · ${item.album}</span>
                    </div>
                    <div class="barra">
                        <div style="width: ${porcentagem}%">${item.total} reproduções</div>
                    </div>
                </div>
            `;
        }
    }

    if (posicao == 0) {
        html = `<p class="vazio">Nenhuma música encontrada.</p>`;
    }

    faixas_total.innerHTML = `${soma} REPRODUÇÕES`;
    container_faixas.innerHTML = html;
}

function desenharMusicaMaisOuvida() {
    if (faixas.length > 0 && faixas[0].total > 0) {
        kpi_faixa.innerHTML = `
            <img class="capa-kpi" src="${faixas[0].capa}" alt="Capa de ${faixas[0].album}">
            <div>
                <b>${faixas[0].titulo}</b>
                <span>${faixas[0].artista} · ${faixas[0].total} reproduções</span>
            </div>
        `;
    } else {
        kpi_faixa.innerHTML = `<span class="vazio">Toque uma música para começar</span>`;
    }
}

function desenharUltimosDias() {
    let maiorDia = 1;
    let html = "";

    for (let i = 0; i < dias.length; i++) {
        if (dias[i].total > maiorDia) {
            maiorDia = dias[i].total;
        }
    }

    for (let i = 0; i < dias.length; i++) {
        let altura = dias[i].total / maiorDia * 80;

        html += `
            <div class="dia">
                <span>${dias[i].total}</span>
                <div style="height: ${altura}px"></div>
                ${dias[i].dia}
            </div>
        `;
    }

    if (dias.length == 0) {
        html = `<span class="vazio">Sem reproduções nos últimos 7 dias</span>`;
    }

    kpi_dias.innerHTML = html;
}

function tocar(idMusica) {
    for (let i = 0; i < faixas.length; i++) {
        if (faixas[i].idMusica == idMusica) {
            idTocando = idMusica;
            jaRegistrou = false;

            player.src = faixas[i].arquivo;
            player.play();

            p_titulo.innerHTML = faixas[i].titulo;
            p_artista.innerHTML = faixas[i].artista;
            p_capa.innerHTML = `<img class="capa" src="${faixas[i].capa}" alt="Capa de ${faixas[i].album}">`;
            p_btn.innerHTML = "❚❚";
        }
    }

    desenharLista();
}

function pausarOuTocar() {
    if (idTocando == 0) {
        return false;
    }

    if (player.paused) {
        player.play();
        p_btn.innerHTML = "❚❚";
    } else {
        player.pause();
        p_btn.innerHTML = "▶";
    }
}

function atualizarPlayer() {
    if (player.duration > 0) {
        let porcentagem = player.currentTime / player.duration * 100;

        p_barra.innerHTML = `<div style="width: ${porcentagem}%"></div>`;
        p_tempo.innerHTML = `${Math.floor(player.currentTime)}s / ${Math.floor(player.duration)}s`;

        if (player.currentTime >= 2) {
            registrar();
        }
    }
}

function terminou() {
    registrar();
    p_btn.innerHTML = "▶";
}

function registrar() {
    if (jaRegistrou == true || idTocando == 0) {
        return false;
    }

    jaRegistrou = true;

    fetch("/mix/reproducoes", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idUsuarioServer: idUsuario,
            idMusicaServer: idTocando
        })
    }).then(function (resposta) {
        if (resposta.ok) {
            carregarDados();
        } else {
            console.log("Houve um erro ao registrar a reprodução!");
        }
    }).catch(function (erro) {
        console.log(erro);
    });
}

carregarDados();
