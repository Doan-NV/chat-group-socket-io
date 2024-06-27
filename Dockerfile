FROM node:20-alpine3.18 As development

WORKDIR /usr/src/app

COPY package*.json ./
COPY . .
RUN npm install

CMD ["npm", "start"]