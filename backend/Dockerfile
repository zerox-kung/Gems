FROM node:25-alpine
WORKDIR /app
COPY package.json ./
COPY server.js seed.js ./
COPY data/gems.json ./data/gems.json
RUN mkdir -p /app/database
EXPOSE 3001
CMD ["sh", "-c", "npm run seed && npm start"]
