const http = require("http");
const fs = require("fs");

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

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    res.setHeader("Content-Type", "text/html");
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      "<body><h1>Home route:</h1><form action='/message' method='POST'><input type='text' name='message'><button type='submit'>Send</button></form></body>"
    );
    res.write("</html>");
    return res.end();
  }

  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", chunk => {
      console.log(chunk);
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      console.log(message);
      //fs.writeFileSync("message.txt", message);  // sync - execution blocking
      // writeFile is async - should be used to not block the execution
      fs.writeFile("message.txt", message, err => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  // Basic response:

  //RESPONSES - server -> client
  // res.setHeader("Content-Type", "text/html");
  // res.write("<html>");
  // res.write("<head><title>My First Page</title></head>");
  // res.write("<body><h1>Hello from my NodeJS server</h1></body>");
  // res.write("</html>");
  // res.end();
});

server.listen(8080);
