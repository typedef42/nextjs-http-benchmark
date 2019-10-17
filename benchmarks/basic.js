import http from "k6/http";

export let options = {
  vus: 100,
  iterations: 1000,
  insecureSkipTLSVerify: true
};

export default function() {
  let targetUri =
    __ENV.WITH_REVERSE_PROXY === "1"
      ? `${__ENV.TARGET_APP}.test`
      : `h2-tests_${__ENV.TARGET_APP}:${__ENV.TARGET_PORT}`;
  let targetProtocol = __ENV.TARGET_HTTPS === "1" ? "https" : "http";

  http.get(`${targetProtocol}://${targetUri}/`);
}
