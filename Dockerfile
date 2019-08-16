FROM armhf/node:7.8.0

WORKDIR /api

COPY ./index.js ./package.json ./src ./

RUN mkdir logs && npm install

ENV HOST=0.0.0.0

ENV PORT=3000

EXPOSE 3000

VOLUME /api/logs

ENTRYPOINT [ "npm start" ]
