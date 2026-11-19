FROM node:25-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

EXPOSE 443

CMD ["npm", "run", "dev:secure"]
