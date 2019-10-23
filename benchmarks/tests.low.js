const tests = [
  {
    name: "low-images",
    server: "NextJS-HTTP",
    url: "http://h2tests-next:3000/low-images",
    localUrl: "http://localhost:3000/low-images"
  },
  {
    skipLocal: true,
    name: "low-images",
    server: "ReverseProxy-HTTP2_to_NextJS-HTTP",
    url: "https://next.test/low-images"
  },
  {
    name: "low-images",
    server: "NextJS-HTTPS",
    url: "https://h2tests-https:3001/low-images",
    localUrl: "https://localhost:3001/low-images"
  },
  {
    skipLocal: true,
    name: "low-images",
    server: "ReverseProxy-HTTP2_to_NextJS-HTTPS",
    url: "https://https.test/low-images"
  },
  {
    name: "low-images",
    server: "NextJS-Express-SPDY",
    url: "https://h2tests-express:3002/low-images",
    localUrl: "https://localhost:3002/low-images"
  },
  {
    skipLocal: true,
    name: "low-images",
    server: "ReverseProxy-HTTP2_to_NextJS-Express-SPDY",
    url: "https://express.test/low-images"
  },
  {
    name: "low-images",
    server: "NextJS-fastify",
    url: "https://h2tests-fastify:3003/low-images",
    localUrl: "https://localhost:3003/low-images"
  },
  {
    skipLocal: true,
    name: "low-images",
    server: "ReverseProxy-HTTP2_to_NextJS-Fastify",
    url: "https://fastify.test/low-images"
  }
];
module.exports = tests;
