
const pesquisa = document.getElementById("pesquisa");
const filtro = document.getElementById("filtro");
const botaoTema = document.getElementById("tema");

const cards = document.querySelectorAll(".card");
const semResultados = document.getElementById("sem-resultados");


function normalizar(texto) {
    return texto
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function filtrarOficinas() {
    const texto = normalizar(pesquisa.value.trim());
    const categoria = normalizar(filtro.value);

    let encontrados = 0;

    cards.forEach(card => {
        const titulo = normalizar(
            card.querySelector("h3").textContent
        );

        const descricao = normalizar(
            card.querySelector("p").textContent
        );

        const tag = normalizar(
            card.querySelector(".tag").textContent.trim()
        );

        const correspondePesquisa =
            titulo.includes(texto) ||
            descricao.includes(texto) ||
            tag.includes(texto);

        const correspondeCategoria =
            categoria === "todas" ||
            tag === categoria;

        if (correspondePesquisa && correspondeCategoria) {
            card.style.display = "";
            encontrados++;
        } else {
            card.style.display = "none";
        }
    });

    semResultados.hidden = encontrados > 0;
}

pesquisa.addEventListener("input", filtrarOficinas);

filtro.addEventListener("change", filtrarOficinas);

function atualizarTema(modoEscuro) {
    document.body.classList.toggle("dark", modoEscuro);

    botaoTema.textContent = modoEscuro
        ? " Modo claro"
        : " Modo escuro";

    botaoTema.setAttribute(
        "aria-pressed",
        String(modoEscuro)
    );
}

botaoTema.addEventListener("click", () => {
    const modoEscuro = !document.body.classList.contains("dark");

    atualizarTema(modoEscuro);

    localStorage.setItem(
        "tema",
        modoEscuro ? "escuro" : "claro"
    );
});

const temaSalvo = localStorage.getItem("tema");

atualizarTema(temaSalvo === "escuro");