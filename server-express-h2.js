const next = require("next");
const express = require("express");
const compression = require("compression");
const spdy = require("spdy");
const fs = require("fs");

const port = parseInt(process.env.PORT, 10) || 3002;
const dev = process.env.NODE_ENV !== "production";
const conf = require("./next.config")();

const app = next({ dev, conf });
const handle = app.getRequestHandler();

const options = {
  key: fs.readFileSync(__dirname + "/privateKey.key"),
  cert: fs.readFileSync(__dirname + "/certificate.crt")
};

const shouldCompress = (req, res) => {
  if (req.headers["x-no-compression"]) {
    // don't compress responses with this request header
    return false;
  }

  // fallback to standard filter function
  return compression.filter(req, res);
};

app.prepare().then(() => {
  const expressApp = express();
  // expressApp.use(compression({ filter: shouldCompress }));

  expressApp.get("/", (req, res) => {
    return app.render(req, res, "/", req.query);
  });

  expressApp.get("/public-resume", (req, res) => {
    return app.render(req, res, "/public-resume", req.query);
  });

  expressApp.all("*", (req, res) => {
    return handle(req, res);
  });

  const server = spdy.createServer(options, expressApp).listen(port, error => {
    if (error) {
      console.error(error);
      return process.exit(1);
    } else {
      console.log(`Http2 server listening on port: ${port}`);
    }
  });
});
