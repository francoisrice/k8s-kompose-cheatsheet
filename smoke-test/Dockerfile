FROM node:18-alpine

RUN apk update

WORKDIR /home/app
COPY . .

RUN npm install
RUN npx tsc

CMD ["node", "dist/main.js"]
