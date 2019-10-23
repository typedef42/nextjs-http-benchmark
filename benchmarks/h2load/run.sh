#!/bin/sh
docker-compose run h2load -c "mkdir -p /output/h2load/"

batchTest() {
  echo "testing $2 without proxy"
  docker-compose run h2load -c "h2load -n10000 -c1 -m1 --h1 http://h2tests-next:3000$1 > '/output/h2load/$2_next_noproxy.txt'"
  docker-compose run h2load -c "h2load -n10000 -c1 -m1 --h1 https://h2tests-https:3001$1 > '/output/h2load/$2_https_noproxy.txt'"
  docker-compose run h2load -c "h2load -n10000 -c1 -m1 https://h2tests-express:3002$1 > '/output/h2load/$2_express_noproxy.txt'"
  docker-compose run h2load -c "h2load -n10000 -c1 -m1 https://h2tests-fastify:3003$1 > '/output/h2load/$2_fastify_noproxy.txt'"

  echo "testing $2 with traefik"
  docker-compose run h2load -c "h2load -n10000 -c1 -m1 'https://next.test$1' > '/output/h2load/$2_next_traefik.txt'"
  docker-compose run h2load -c "h2load -n10000 -c1 -m1 'https://https.test$1' > '/output/h2load/$2_https_traefik.txt'"
  docker-compose run h2load -c "h2load -n10000 -c1 -m1 'https://express.test$1' > '/output/h2load/$2_express_traefik.txt'"
  docker-compose run h2load -c "h2load -n10000 -c1 -m1 'https://fastify.test$1' > '/output/h2load/$2_fastify_traefik.txt'"
}


# batchTest "/" "basic"
# batchTest "/landingpage" "landingpage"
# batchTest "/low-images" "low"
# batchTest "/medium-images" "medium"
# batchTest "/heavy-images" "heavy"
# batchTest "/static/image.png" "img-png"
# batchTest "/static/image.jpg" "img-jpg"
# batchTest "/static/data-small.json" "data-small-json"
# batchTest "/static/data-heavy.json" "data-heavy-json"
# batchTest "/static/data-16ko.bin" "data-bin-16ko"
# batchTest "/static/data-8mo.bin" "data-bin-8mo"

echo "processing test results"
docker-compose run benchmark node h2load/process.js
