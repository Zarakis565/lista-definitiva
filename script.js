document.addEventListener("DOMContentLoaded", loadAnimes);

function addAnime() {
    let name = document.getElementById("animeName").value.trim();
    let genre = document.getElementById("animeGenre").value.trim();
    let year = document.getElementById("animeYear").value.trim();
    let episodes = document.getElementById("animeEpisodes").value.trim();
    let status = document.getElementById("animeStatus").value;
    let rating = document.getElementById("animeRating").value.trim();

    if (!name || !genre || !year || !episodes || !rating) {
        alert("Preencha todos os campos!");
        return;
    }

    let anime = { name, genre, year, episodes, status, rating };
    addAnimeToSection(anime);
    saveAnimes();
    clearForm();
}

function addAnimeToSection(anime) {
    let section = document.getElementById(getSectionId(anime.status));
    let animeDiv = document.createElement("div");
    animeDiv.classList.add("anime-card");

    let titleElem = document.createElement("div");
    titleElem.classList.add("anime-title");
    titleElem.textContent = anime.name;

    let infoElem = document.createElement("div");
    infoElem.innerHTML = `
        🎭 <b>Gênero:</b> ${anime.genre} <br>
        📅 <b>Ano:</b> ${anime.year} <br>
        🎥 <b>Episódios:</b> ${anime.episodes} <br>
        ⭐ <b>Nota:</b> <span class="anime-rating">${anime.rating}/10</span>
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
    section.appendChild(animeDiv);
}

function getSectionId(status) {
    switch (status) {
        case "Assistindo": return "watchingList";
        case "Completo": return "completedList";
        case "Dropado": return "droppedList";
        case "Planejo Ver": return "plannedList";
    }
}

function saveAnimes() {
    let animes = [];
    document.querySelectorAll(".anime-card").forEach(anime => {
        let name = anime.querySelector(".anime-title").textContent;
        let info = anime.querySelector("div").innerHTML.split("<br>");
        let genre = info[0].replace("🎭 <b>Gênero:</b> ", "").trim();
        let year = info[1].replace("📅 <b>Ano:</b> ", "").trim();
        let episodes = info[2].replace("🎥 <b>Episódios:</b> ", "").trim();
        let rating = info[3].replace("⭐ <b>Nota:</b> ", "").replace("/10", "").trim();

        animes.push({ name, genre, year, episodes, rating });
    });

    localStorage.setItem("animes", JSON.stringify(animes));
}

function loadAnimes() {
    let savedAnimes = JSON.parse(localStorage.getItem("animes")) || [];
    savedAnimes.forEach(anime => addAnimeToSection(anime));
}

function clearForm() {
    document.getElementById("animeName").value = "";
    document.getElementById("animeGenre").value = "";
    document.getElementById("animeYear").value = "";
    document.getElementById("animeEpisodes").value = "";
    document.getElementById("animeRating").value = "";
}
