# Stage 1: Build da aplicação (Vite + React)
FROM node:20-slim AS builder

WORKDIR /app

# Copia os arquivos de dependência
COPY package*.json ./

# A flag --force é CRITICA aqui para garantir que os "overrides"
# do package.json sejam respeitados e o erro ERESOLVE seja ignorado
RUN npm install --force

# Copia todo o código fonte
COPY . .

# Executa o build (no seu package.json isso roda: tsc && vite build)
RUN npm run build

# Stage 2: Servir com NGINX
FROM nginx:alpine

# O Vite gera os arquivos estáticos na pasta 'dist'
COPY --from=builder /app/dist /usr/share/nginx/html

# Remove a configuração padrão do Nginx para evitar conflitos
# com o arquivo nginx.conf que você montará via volume
RUN rm /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]