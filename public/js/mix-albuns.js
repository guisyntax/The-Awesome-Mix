let albuns = [];

function carregarDados() {
    fetch(`/mix/albuns/${idUsuario}`).then(function (resposta) {
        resposta.json().then(function (json) {
            albuns = json;
            desenhar();
        });
    }).catch(function (erro) {
        console.log(erro);
    });
}

function desenhar() {
    desenharLista();
    desenharAlbumMaisOuvido();
    desenharPeterVsMinhas(albuns);
}

function desenharLista() {
    let posicao = 0;
    let maior = 0;
    let soma = 0;
    let html = "";

    for (let i = 0; i < albuns.length; i++) {
        let item = albuns[i];

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

            html += `
                <div class="linha ${item.origem}">
                    <span class="pos">${posicao}</span>
                    <img class="capa" src="${item.capa}" alt="Capa de ${item.album}">
                    <div class="info">
                        <b>${item.album}</b>
                        <span>${item.qtd} faixas</span>
                    </div>
                    <div class="barra">
                        <div style="width: ${porcentagem}%">${item.total} reproduções</div>
                    </div>
                </div>
            `;
        }
    }

    if (posicao == 0) {
        html = `<p class="vazio">Nenhum álbum encontrado.</p>`;
    }

    faixas_total.innerHTML = `${soma} REPRODUÇÕES`;
    container_faixas.innerHTML = html;
}

function desenharAlbumMaisOuvido() {
    if (albuns.length > 0 && albuns[0].total > 0) {
        kpi_album.innerHTML = `
            <img class="capa-kpi" src="${albuns[0].capa}" alt="Capa de ${albuns[0].album}">
            <div>
                <b>${albuns[0].album}</b>
                <span>${albuns[0].total} reproduções</span>
            </div>
        `;
    } else {
        kpi_album.innerHTML = `<span class="vazio">Ainda sem reproduções</span>`;
    }
}

carregarDados();
