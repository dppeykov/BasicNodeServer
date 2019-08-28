const http = require("http");

// managed by the event loop -
// keeps running as long as there are event listeners registered
const server = http.createServer((req, res) => {
  console.log("Helloooo");
  //process.exit(); //if we want to end the node process
});

server.listen(8080);
