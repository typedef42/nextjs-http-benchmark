const { createServer } = require("https");
const { parse } = require("url");
const path = require("path");
const fs = require("fs");
const next = require("next");

const port = 3001;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync(path.join(__dirname, "/../certs/privateKey.key")),
  cert: fs.readFileSync(path.join(__dirname, "/../certs/certificate.crt"))
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, err => {
    if (err) throw err;
    console.log(`Node https Server listening on https://localhost:${port}`);
  });
});
