const http = require("http");
const fs = require("fs");

const PORT = 3000;
const FILE = "movies.json";

// Read movies from JSON file
const getMovies = () => {
    const data = fs.readFileSync(FILE);
    return JSON.parse(data);
};

// Save movies to JSON file
const saveMovies = (data) => {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
};

const server = http.createServer((req, res) => {
    const urlParts = req.url.split("/");
    const id = parseInt(urlParts[2]);

    // GET all movies
    if (req.method === "GET" && req.url === "/movies") {
        const movies = getMovies();
        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(movies));
    }

    // GET single movie by ID
    if (req.method === "GET" && urlParts[1] === "movies" && id) {
        const movies = getMovies();
        const movie = movies.find(m => m.id === id);

        if (!movie) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("Movie not found");
        }

        res.writeHead(200, { "Content-Type": "application/json" });
        return res.end(JSON.stringify(movie));
    }

    // POST new movie
    if (req.method === "POST" && req.url === "/movies") {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const movies = getMovies();
            const newMovie = JSON.parse(body);

            newMovie.id = Date.now();
            movies.push(newMovie);

            saveMovies(movies);

            res.writeHead(201, { "Content-Type": "application/json" });
            res.end(JSON.stringify(newMovie));
        });

        return;
    }

    // PUT update movie
    if (req.method === "PUT" && urlParts[1] === "movies" && id) {
        let body = "";

        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            let movies = getMovies();
            const updatedData = JSON.parse(body);

            const index = movies.findIndex(m => m.id === id);

            if (index === -1) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                return res.end("Movie not found");
            }

            movies[index] = { ...movies[index], ...updatedData, id };

            saveMovies(movies);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(movies[index]));
        });

        return;
    }

    // DELETE movie
    if (req.method === "DELETE" && urlParts[1] === "movies" && id) {
        let movies = getMovies();

        const filteredMovies = movies.filter(m => m.id !== id);

        if (movies.length === filteredMovies.length) {
            res.writeHead(404, { "Content-Type": "text/plain" });
            return res.end("Movie not found");
        }

        saveMovies(filteredMovies);

        res.writeHead(200, { "Content-Type": "text/plain" });
        return res.end("Movie deleted successfully");
    }

    // Default route
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Route not found");
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});