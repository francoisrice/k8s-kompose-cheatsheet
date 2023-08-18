FROM node:18-alpine

RUN apk update

WORKDIR /home/app
# COPY . .
COPY test-redis.ts test-redis.ts
COPY tsconfig.json tsconfig.json
COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install
RUN npx tsc

CMD ["node", "test-redis.js"]
