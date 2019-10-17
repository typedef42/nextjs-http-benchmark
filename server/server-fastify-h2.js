const path = require("path");
const fs = require("fs");

// --------------------------------------------------------
// Fastify server configuration
// --------------------------------------------------------
const port = parseInt(process.env.PORT, 10) || 3003;
const dev = process.env.NODE_ENV !== "production";
const conf = require("../next.config")();
const fastify = require("fastify")({
  // logger: true,
  http2: true,
  https: {
    key: fs.readFileSync(path.join(__dirname, "/../certs/privateKey.key")),
    cert: fs.readFileSync(path.join(__dirname, "/../certs/certificate.crt"))
  }
});

// --------------------------------------------------------
// Next routes & rendering configuration
// --------------------------------------------------------
const initNext = async () => {
  fastify.register((instance, opts, next) => {
    instance.register(require("fastify-static"), {
      root: path.join(__dirname, "../static"),
      prefix: "/static/"
    });
    // here `reply.sendFile` refers to 'static' files
    next();
  });

  fastify.register((instance, opts, next) => {
    instance.register(require("fastify-static"), {
      root: path.join(__dirname, "../public"),
      prefix: "/"
    });
    // here `reply.sendFile` refers to 'public' files
    next();
  });

  // fastify.register(require("fastify-compress"), { threshold: 0 });

  fastify.register(require("fastify-nextjs"), { dev, conf }).after(() => {
    // fastify.next("/", (app, req, reply) => {
    //   app.render(req.raw, reply.res, "/", req.query, {});
    // });

    // fastify.next("/lots-of-images", (app, req, reply) => {
    //   app.render(req.raw, reply.res, "/lots-of-images", req.query, {});
    // });

    fastify.next("/");
    fastify.next("/low-images");
    fastify.next("/medium-images");
    fastify.next("/heavy-images");
  });
};

// --------------------------------------------------------
// Fastify server startup
// --------------------------------------------------------
(async function() {
  await initNext();

  await fastify.listen(port, "0.0.0.0", err => {
    if (err) throw err;
    console.log(`Fastify Server listening on https://localhost:${port}`);
  });
})();
