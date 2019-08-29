const fs = require("fs");

const requestHandler = (req, res) => {
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
};

// Ways of exporting
module.exports = requestHandler;

// Exporting multiple objects
// module.exports = {
//   handler: requestHandler,
//   hardcodedText: "text here"
// }

// OR
//module.exports.handler = requestHandler;
//module.exports.hardcodedText = "text here"

// OR a shortcut
//exports.handler = requestHandler;
//exports.hardcodedText = "text here"
