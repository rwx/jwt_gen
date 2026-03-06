FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Comando padrão espera um JSON como argumento via docker run
ENTRYPOINT ["node", "index.js"]
