FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

COPY . .
RUN npm install

RUN npm run build

CMD ["node", "dist/app.js"]
