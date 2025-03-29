FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npx tsc

WORKDIR /app/dist/src

EXPOSE 6713

CMD ["node", "index.js"]