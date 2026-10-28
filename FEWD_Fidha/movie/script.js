
const API_KEY = "11beabcc2f1cdbfcabaaf7fd837c0d9d";

async function searchMovie() {
    const name = document.getElementById("movieInput").value.trim();
    const results = document.getElementById("results");

    if (name === "") {
        results.innerHTML = "<p>Please enter a movie name!</p>";
        return;
    }

    results.innerHTML = "<p>Searching...</p>";

    try {
        const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(name)}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.status_message || "API request failed");
        }

        results.innerHTML = "";

        if (data.results.length === 0) {
            results.innerHTML = "<p>No movies found.</p>";
            return;
        }

        data.results.forEach(movie => {
            const poster = movie.poster_path
                ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                : "";

            const card = document.createElement("div");
            card.className = "movie";

            const img = document.createElement("img");
            img.src = poster;
            img.alt = movie.title + " poster";
            img.style.width = "100%";
            img.hidden = !poster;

            const title = document.createElement("h3");
            title.textContent = movie.title;

            const year = document.createElement("p");
            year.textContent = "Release Year: " +
                (movie.release_date
                    ? movie.release_date.substring(0, 4)
                    : "N/A");

            const rating = document.createElement("p");
            rating.textContent = "Rating: " +
                (movie.vote_average
                    ? movie.vote_average.toFixed(1) + "/10"
                    : "N/A");

            if (!poster) {
                const noPoster = document.createElement("p");
                noPoster.textContent = "No poster available";
                card.appendChild(noPoster);
            } else {
                card.appendChild(img);
            }

            card.append(title, year, rating);
            results.appendChild(card);
        });

    } catch (error) {
        results.innerHTML = `<p>${error.message}</p>`;
        console.error(error);
    }
}
