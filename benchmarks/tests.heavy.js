const tests = [
  {
    name: "heavy-images",
    server: "NextJS-HTTP",
    url: "http://h2-tests_next:3000/heavy-images",
    localUrl: "http://localhost:3000/heavy-images"
  },
  {
    skipLocal: true,
    name: "heavy-images",
    server: "ReverseProxy-HTTP2_to_NextJS-HTTP",
    url: "https://next.test/heavy-images"
  },
  {
    name: "heavy-images",
    server: "NextJS-HTTPS",
    url: "https://h2-tests_https:3001/heavy-images",
    localUrl: "https://localhost:3001/heavy-images"
  },
  {
    skipLocal: true,
    name: "heavy-images",
    server: "ReverseProxy-HTTP2_to_NextJS-HTTPS",
    url: "https://https.test/heavy-images"
  },
  {
    name: "heavy-images",
    server: "NextJS-Express-SPDY",
    url: "https://h2-tests_express:3002/heavy-images",
    localUrl: "https://localhost:3002/heavy-images"
  },
  {
    skipLocal: true,
    name: "heavy-images",
    server: "ReverseProxy-HTTP2_to_NextJS-Express-SPDY",
    url: "https://express.test/heavy-images"
  },
  {
    name: "heavy-images",
    server: "NextJS-fastify",
    url: "https://h2-tests_fastify:3003/heavy-images",
    localUrl: "https://localhost:3003/heavy-images"
  },
  {
    skipLocal: true,
    name: "heavy-images",
    server: "ReverseProxy-HTTP2_to_NextJS-Fastify",
    url: "https://fastify.test/heavy-images"
  }
];
module.exports = tests;
