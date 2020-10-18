const http = require("http");

server = http.createServer((req, res) => {
    res.statusCode = 400;
    res.setHeader('Content-Type','text/html');
    res.write('<h1>Thank you, Next</h1>');
    res.end();
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log("Running 5000");
});
