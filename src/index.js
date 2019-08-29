const http = require("http");
const routes = require("./routes");
// managed by the event loop -
// keeps running as long as there are event listeners registered

//REQUESTS - client -> server

//Just a basic request below - on GET request, prints the URL, METHOD & HEADERS
// const server = http.createServer((req, res) => {
//   console.log(
//     `
//     URL: ${req.url},
//     METHOD: ${req.method},
//     HEADERS:
//     `,
//     req.headers
//   );
//process.exit(); //if we want to end the node process

const server = http.createServer(routes);
// Basic response:

//RESPONSES - server -> client
// res.setHeader("Content-Type", "text/html");
// res.write("<html>");
// res.write("<head><title>My First Page</title></head>");
// res.write("<body><h1>Hello from my NodeJS server</h1></body>");
// res.write("</html>");
// res.end();
// });

server.listen(8080);
