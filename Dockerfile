FROM node:10.10.0
WORKDIR /api
COPY . .
RUN mkdir -p logs && npm install
ENV HOST=0.0.0.0
ENV PORT=3000
ENV CORS=true
EXPOSE 3000
VOLUME /api/logs
CMD ["npm", "start"]
