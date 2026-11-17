let idUsuario = sessionStorage.ID_USUARIO;
let filtroAtual = "todos";

if (idUsuario == undefined) {
    window.location = "./login.html";
}

mix_titulo.innerHTML = `Olá, ${sessionStorage.NOME_USUARIO}`;

function filtrar(filtro) {
    filtroAtual = filtro;

    chip_todos.className = "chip";
    chip_Peter.className = "chip";
    chip_Guilherme.className = "chip";
    document.getElementById("chip_" + filtro).className = "chip ativo";

    desenharLista();
}

function desenharPeterVsMinhas(lista) {
    let totalPeter = 0;
    let totalMinhas = 0;

    for (let i = 0; i < lista.length; i++) {
        if (lista[i].origem == "Peter") {
            totalPeter += lista[i].total;
        } else {
            totalMinhas += lista[i].total;
        }
    }

    let fundo = "rgba(239, 233, 247, 0.15)";

    if (totalPeter + totalMinhas > 0) {
        let graus = totalPeter / (totalPeter + totalMinhas) * 360;
        fundo = `conic-gradient(var(--magenta) 0deg ${graus}deg, var(--violet) ${graus}deg 360deg)`;
    }

    kpi_rosca.innerHTML = `<div class="rosca-disco" style="background: ${fundo}"></div>`;

    kpi_legenda.innerHTML = `
        <div><i style="background: var(--magenta)"></i>Peter: ${totalPeter}</div>
        <div><i style="background: var(--violet)"></i>Minhas: ${totalMinhas}</div>
    `;
}
