FROM node

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY ./emulator/package*.json ./

COPY ./utils ../

USER node

RUN npm ci --only=production

COPY --chown=node:node . .

CMD ["node", "./emulator/src/index.js"]
