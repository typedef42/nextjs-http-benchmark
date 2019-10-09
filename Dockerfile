#A lightweight node image
FROM keymetrics/pm2:latest-alpine

# Copy package json files for services
RUN mkdir /app
WORKDIR /app

COPY . .

ENV NODE_ENV=production

RUN npm install && npm run build && npm prune --production

# Expose ports
#EXPOSE 3000

CMD ["pm2-runtime", "start", "ecosystem.config.js"]
