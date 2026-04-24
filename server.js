const http = require("http");
const fs = require("fs");

const PORT = 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Movie Review API is running...");
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});