#A lightweight node image
FROM keymetrics/pm2:latest-alpine

ARG TARGET_PM2_APP
# RUN echo `starting container with pm2 app : $TARGET_PM2_APP`
ENV TARGET_PM2_APP ${TARGET_PM2_APP}

# Copy package json files for services
RUN mkdir /app
WORKDIR /app

COPY . .

ENV NODE_ENV=production

RUN npm install && npm run build && npm prune --production

# RUN ls -al -R

# Expose ports
#EXPOSE 3000

CMD pm2-runtime start ecosystem.config.js --only ${TARGET_PM2_APP}
# CMD ["pm2-runtime", "start", "ecosystem.config.js", "--only", "${TARGET_PM2_APP}"]
# CMD ["pm2-runtime", "start", "ecosystem.config.js", "--only", "server-express"]
