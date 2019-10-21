const testsBasic = [
  {
    name: "basic",
    server: "NextJS-HTTP",
    url: "http://h2-tests_next:3000/",
    localUrl: "http://localhost:3000/"
  },
  {
    name: "basic",
    server: "ReverseProxy-HTTP2_to_NextJS-HTTP",
    url: "https://next.test/"
  },
  {
    name: "basic",
    server: "NextJS-HTTPS",
    url: "https://h2-tests_https:3001/",
    localUrl: "https://localhost:3001/"
  },
  {
    name: "basic",
    server: "ReverseProxy-HTTP2_to_NextJS-HTTPS",
    url: "https://https.test/"
  },
  {
    name: "basic",
    server: "NextJS-Express-SPDY",
    url: "https://h2-tests_express:3002/",
    localUrl: "https://localhost:3002/"
  },
  {
    name: "basic",
    server: "ReverseProxy-HTTP2_to_NextJS-Express-SPDY",
    url: "https://express.test/"
  },
  {
    name: "basic",
    server: "NextJS-fastify",
    url: "https://h2-tests_fastify:3003/",
    localUrl: "https://localhost:3003/"
  },
  {
    name: "basic",
    server: "ReverseProxy-HTTP2_to_NextJS-Fastify",
    url: "https://fastify.test/"
  }
];
module.exports = testsBasic;
