#!/bin/sh

compute_mode() {
  echo "$3: {" >> /output/k6_results.js
  echo "http_req_duration:" >> /output/k6_results.js
  ./node_modules/node-jq/bin/jq '. | select(.type=="Point" and .metric == "http_req_duration" and .data.tags.status >= "200") | .data.value' /output/$1_$2_$3.json | ./node_modules/node-jq/bin/jq -s 'add/length' >> /output/k6_results.js

  echo ",http_req_blocked:" >> /output/k6_results.js
  ./node_modules/node-jq/bin/jq '. | select(.type=="Point" and .metric == "http_req_blocked" and .data.tags.status >= "200") | .data.value' /output/$1_$2_$3.json | ./node_modules/node-jq/bin/jq -s 'add/length' >> /output/k6_results.js

  echo ",http_req_connecting:" >> /output/k6_results.js
  ./node_modules/node-jq/bin/jq '. | select(.type=="Point" and .metric == "http_req_blocked" and .data.tags.status >= "200") | .data.value' /output/$1_$2_$3.json | ./node_modules/node-jq/bin/jq -s 'add/length' >> /output/k6_results.js

  echo ",http_req_receiving:" >> /output/k6_results.js
  ./node_modules/node-jq/bin/jq '. | select(.type=="Point" and .metric == "http_req_receiving" and .data.tags.status >= "200") | .data.value' /output/$1_$2_$3.json | ./node_modules/node-jq/bin/jq -s 'add/length' >> /output/k6_results.js

  echo ",http_req_sending:" >> /output/k6_results.js
  ./node_modules/node-jq/bin/jq '. | select(.type=="Point" and .metric == "http_req_sending" and .data.tags.status >= "200") | .data.value' /output/$1_$2_$3.json | ./node_modules/node-jq/bin/jq -s 'add/length' >> /output/k6_results.js

  echo ",http_req_tls_handshaking:" >> /output/k6_results.js
  ./node_modules/node-jq/bin/jq '. | select(.type=="Point" and .metric == "http_req_tls_handshaking" and .data.tags.status >= "200") | .data.value' /output/$1_$2_$3.json | ./node_modules/node-jq/bin/jq -s 'add/length' >> /output/k6_results.js

  echo ",http_req_waiting:" >> /output/k6_results.js
  ./node_modules/node-jq/bin/jq '. | select(.type=="Point" and .metric == "http_req_waiting" and .data.tags.status >= "200") | .data.value' /output/$1_$2_$3.json | ./node_modules/node-jq/bin/jq -s 'add/length' >> /output/k6_results.js

  echo ",data_received:" >> /output/k6_results.js
  ./node_modules/node-jq/bin/jq '. | select(.type=="Point" and .metric == "data_received" ) | .data.value' /output/$1_$2_$3.json | ./node_modules/node-jq/bin/jq -s 'add' >> /output/k6_results.js

  echo ",data_sent:" >> /output/k6_results.js
  ./node_modules/node-jq/bin/jq '. | select(.type=="Point" and .metric == "data_sent" ) | .data.value' /output/$1_$2_$3.json | ./node_modules/node-jq/bin/jq -s 'add' >> /output/k6_results.js

  echo ",http_reqs:" >> /output/k6_results.js
  ./node_modules/node-jq/bin/jq '. | select(.type=="Point" and .metric == "http_reqs" and .data.tags.status >= "200") | .data.value' /output/$1_$2_$3.json | ./node_modules/node-jq/bin/jq -s 'add' >> /output/k6_results.js

  echo ",iteration_duration:" >> /output/k6_results.js
  ./node_modules/node-jq/bin/jq '. | select(.type=="Point" and .metric == "iteration_duration") | .data.value' /output/$1_$2_$3.json | ./node_modules/node-jq/bin/jq -s 'add' >> /output/k6_results.js

  echo "}" >> /output/k6_results.js

  if [ "$4" = true ] ; then
    echo "," >> /output/k6_results.js
  fi
}

compute_server() {
  echo "$2: {" >> /output/k6_results.js
  compute_mode $1 $2 "noproxy" true
  compute_mode $1 $2 "traefik"
  echo "}" >> /output/k6_results.js

  if [ "$3" = true ] ; then
    echo "," >> /output/k6_results.js
  fi
}

compute_tests() {
  echo "$1: {" >> /output/k6_results.js
  compute_server $1 "next" true
  compute_server $1 "https" true
  compute_server $1 "express" true
  compute_server $1 "fastify"
  echo "}" >> /output/k6_results.js

  if [ "$2" = true ] ; then
    echo "," >> /output/k6_results.js
  fi
}

echo "module.exports = {" > /output/k6_results.js
compute_tests "medium"
echo "}" >> /output/k6_results.js

