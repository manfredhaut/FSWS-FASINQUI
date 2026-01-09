# Imagem base leve do Node.js
FROM node:20-alpine

# Cria a pasta de trabalho
WORKDIR /app

# Copia os arquivos de dependência primeiro (para aproveitar o cache)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o resto do código fonte
COPY . .

# Expõe a porta que o Fastify usa
EXPOSE 3000

# Comando para iniciar o servidor (ajustado para aceitar conexão externa)
CMD ["npx", "ts-node", "src/index.ts"]
