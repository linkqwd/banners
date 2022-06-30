FROM registry.evo.dev/platform/dockerhub/node:14.16.0

ENV CODE_DIR "/opt/app"
WORKDIR $CODE_DIR

COPY . $CODE_DIR

RUN npm i

RUN npm run build

CMD ["/usr/local/bin/npm", "run", "start"]
