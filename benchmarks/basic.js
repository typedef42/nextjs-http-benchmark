import http from "k6/http";

export let options = {
  vus: 100,
  iterations: 10000
};

export default function() {
  http.get("http://localhost:3000/");
}
