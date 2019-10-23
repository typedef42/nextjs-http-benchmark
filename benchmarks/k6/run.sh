#!/bin/sh

############################################
## basic index page
############################################


# docker-compose run k6 run -e TARGET_APP=next -e WITH_REVERSE_PROXY=0 -e TARGET_HTTPS=0 -e TARGET_PORT=3000 ./scripts/basic.js
# docker-compose run k6 run -e TARGET_APP=next -e WITH_REVERSE_PROXY=1 -e TARGET_HTTPS=1 ./scripts/basic.js

# docker-compose run k6 run -e TARGET_APP=https -e WITH_REVERSE_PROXY=0 -e TARGET_HTTPS=1 -e TARGET_PORT=3001 ./scripts/basic.js
# docker-compose run k6 run -e TARGET_APP=https -e WITH_REVERSE_PROXY=1 -e TARGET_HTTPS=1 ./scripts/basic.js

# docker-compose run k6 run -e TARGET_APP=express -e WITH_REVERSE_PROXY=0 -e TARGET_HTTPS=1 -e TARGET_PORT=3002 ./scripts/basic.js
# docker-compose run k6 run -e TARGET_APP=express -e WITH_REVERSE_PROXY=1 -e TARGET_HTTPS=1 ./scripts/basic.js

# docker-compose run k6 run -e TARGET_APP=fastify -e WITH_REVERSE_PROXY=0 -e TARGET_HTTPS=1 -e TARGET_PORT=3003 ./scripts/basic.js
# docker-compose run k6 run -e TARGET_APP=fastify -e WITH_REVERSE_PROXY=1 -e TARGET_HTTPS=1 ./scripts/basic.js

############################################
## lots of images (without reverse proxy)
############################################

# docker-compose run k6 run --out json=/output/medium_next_noproxy.json -e TARGET_APP=next -e WITH_REVERSE_PROXY=0 -e TARGET_HTTPS=0 -e TARGET_PORT=3000 ./scripts/medium.js
# docker-compose run k6 run --out json=/output/medium_next_traefik.json -e TARGET_APP=next -e WITH_REVERSE_PROXY=1 -e TARGET_HTTPS=1 ./scripts/medium.js

# docker-compose run k6 run --out json=/output/medium_https_noproxy.json -e TARGET_APP=https -e WITH_REVERSE_PROXY=0 -e TARGET_HTTPS=1 -e TARGET_PORT=3001 ./scripts/medium.js
# docker-compose run k6 run --out json=/output/medium_https_traefik.json -e TARGET_APP=https -e WITH_REVERSE_PROXY=1 -e TARGET_HTTPS=1 ./scripts/medium.js

# docker-compose run k6 run --out json=/output/medium_express_noproxy.json -e TARGET_APP=express -e WITH_REVERSE_PROXY=0 -e TARGET_HTTPS=1 -e TARGET_PORT=3002 ./scripts/medium.js
# docker-compose run k6 run --out json=/output/medium_express_traefik.json -e TARGET_APP=express -e WITH_REVERSE_PROXY=1 -e TARGET_HTTPS=1 ./scripts/medium.js

# docker-compose run k6 run --out json=/output/medium_fastify_noproxy.json -e TARGET_APP=fastify -e WITH_REVERSE_PROXY=0 -e TARGET_HTTPS=1 -e TARGET_PORT=3003 ./scripts/medium.js
# docker-compose run k6 run --out json=/output/medium_fastify_traefik.json -e TARGET_APP=fastify -e WITH_REVERSE_PROXY=1 -e TARGET_HTTPS=1 ./scripts/heavy-static.js

docker-compose run benchmark k6/process.sh
