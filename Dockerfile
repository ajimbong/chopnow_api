FROM node:18.20.4-alpine3.20

RUN mkdir /app
WORKDIR /app

COPY package.json .
RUN npm install

COPY . .

ENV PORT=8002

EXPOSE 8002
CMD [ "npm", "start"]