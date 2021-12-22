FROM node:16-alpine

WORKDIR /app

COPY package.json .

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV BROWSER_WS_ENDPOINT=ws://chrome:3000
ENV LOG_DIR=/app/logs

RUN npm install

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start" ]