const http = require("http");

// managed by the event loop -
// keeps running as long as there are event listeners registered
const server = http.createServer((req, res) => {
  console.log(
    `
    URL: ${req.url}, 
    METHOD: ${req.method}, 
    HEADERS: 
    `,
    req.headers
  );
  //process.exit(); //if we want to end the node process
});

server.listen(8080);
