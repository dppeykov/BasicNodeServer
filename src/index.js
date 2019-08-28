const http = require("http");

const server = http.createServer((req, res) => console.log("Helloooo"));

server.listen(8080);
