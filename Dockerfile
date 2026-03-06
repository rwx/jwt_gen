# Stage 1: Build the web assets
FROM node:20-alpine AS build
WORKDIR /app
COPY . .
WORKDIR /app/web
RUN npm install
RUN npm run build

# Stage 2: Production server
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY --from=build /app/web/dist ./web/dist
COPY server.js .

EXPOSE 8080
ENV PORT=8080

CMD ["node", "server.js"]
