FROM node:20-alpine AS builder
WORKDIR /app

# Cache de dependências npm
COPY package*.json ./
RUN npm ci --frozen-lockfile

# Build args para variáveis de ambiente
ARG VITE_API_BASE_URL=http://localhost:8080/api/v1
ARG VITE_GOOGLE_CLIENT_ID=
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

# Build da aplicação
COPY . .
RUN npm run build

# ─── Production Stage (Nginx) ────────────────────────────────────
FROM nginx:alpine AS runtime

# Configuração Nginx otimizada para SPA
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
