import http from "k6/http";

export let options = {
  vus: 100,
  iterations: 10000,
  insecureSkipTLSVerify: true
};

export default function() {
  http.get("https://127.0.0.1:3000/");
}
