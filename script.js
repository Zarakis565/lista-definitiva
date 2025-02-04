document.addEventListener("DOMContentLoaded", loadAnimes);

function addAnime() {
    let name = document.getElementById("animeName").value.trim();
    let genre = document.getElementById("animeGenre").value.trim();
    let year = document.getElementById("animeYear").value.trim();
    let episodes = document.getElementById("animeEpisodes").value.trim();
    let status = document.getElementById("animeStatus").value;

    if (!name || !genre || !year || !episodes) {
        alert("Preencha todos os campos!");
        return;
    }

    let animeList = document.getElementById("animeList");
    let animeDiv = document.createElement("div");
    animeDiv.classList.add("anime-card");

    let titleElem = document.createElement("div");
    titleElem.classList.add("anime-title");
    titleElem.textContent = name;

    let infoElem = document.createElement("div");
    infoElem.classList.add("anime-info");
    infoElem.innerHTML = `
        🎭 <b>Gênero:</b> ${genre} <br>
        📅 <b>Ano:</b> ${year} <br>
        🎥 <b>Episódios:</b> ${episodes} <br>
        🔖 <b>Status:</b> ${status}
    `;

    let deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Excluir";
    deleteBtn.classList.add("delete");
    deleteBtn.onclick = function () {
        animeDiv.remove();
        saveAnimes();
    };

    animeDiv.appendChild(titleElem);
    animeDiv.appendChild(infoElem);
    animeDiv.appendChild(deleteBtn);
    animeList.appendChild(animeDiv);

    saveAnimes();

    // Limpar Campos
    document.getElementById("animeName").value = "";
    document.getElementById("animeGenre").value = "";
    document.getElementById("animeYear").value = "";
    document.getElementById("animeEpisodes").value = "";
}

function saveAnimes() {
    let animes = [];
    document.querySelectorAll(".anime-card").forEach(anime => {
        let name = anime.querySelector(".anime-title").textContent;
        let infoLines = anime.querySelector(".anime-info").innerHTML.split("<br>");
        let genre = infoLines[0].replace("🎭 <b>Gênero:</b> ", "").trim();
        let year = infoLines[1].replace("📅 <b>Ano:</b> ", "").trim();
        let episodes = infoLines[2].replace("🎥 <b>Episódios:</b> ", "").trim();
        let status = infoLines[3].replace("🔖 <b>Status:</b> ", "").trim();

        animes.push({ name, genre, year, episodes, status });
    });

    localStorage.setItem("animes", JSON.stringify(animes));
}

function loadAnimes() {
    let savedAnimes = JSON.parse(localStorage.getItem("animes")) || [];
    savedAnimes.forEach(anime => addAnimeFromStorage(anime));
}

function addAnimeFromStorage(anime) {
    addAnime(anime.name, anime.genre, anime.year, anime.episodes, anime.status);
}