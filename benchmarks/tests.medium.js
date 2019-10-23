const tests = [
  {
    name: "medium-images",
    server: "NextJS-HTTP",
    url: "http://h2tests-next:3000/medium-images",
    localUrl: "http://localhost:3000/medium-images"
  },
  {
    skipLocal: true,
    name: "medium-images",
    server: "ReverseProxy-HTTP2_to_NextJS-HTTP",
    url: "https://next.test/medium-images"
  },
  {
    name: "medium-images",
    server: "NextJS-HTTPS",
    url: "https://h2tests-https:3001/medium-images",
    localUrl: "https://localhost:3001/medium-images"
  },
  {
    skipLocal: true,
    name: "medium-images",
    server: "ReverseProxy-HTTP2_to_NextJS-HTTPS",
    url: "https://https.test/medium-images"
  },
  {
    name: "medium-images",
    server: "NextJS-Express-SPDY",
    url: "https://h2tests-express:3002/medium-images",
    localUrl: "https://localhost:3002/medium-images"
  },
  {
    skipLocal: true,
    name: "medium-images",
    server: "ReverseProxy-HTTP2_to_NextJS-Express-SPDY",
    url: "https://express.test/medium-images"
  },
  {
    name: "medium-images",
    server: "NextJS-fastify",
    url: "https://h2tests-fastify:3003/medium-images",
    localUrl: "https://localhost:3003/medium-images"
  },
  {
    skipLocal: true,
    name: "medium-images",
    server: "ReverseProxy-HTTP2_to_NextJS-Fastify",
    url: "https://fastify.test/medium-images"
  }
];
module.exports = tests;
