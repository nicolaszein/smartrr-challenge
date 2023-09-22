FROM node:18.17-slim

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install

CMD ["npm", "start"]
