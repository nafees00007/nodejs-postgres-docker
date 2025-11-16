# --------------------
# STAGE 1 — INSTALL DEPS
# --------------------
    FROM node:18-alpine AS builder
    WORKDIR /app
    
    COPY package*.json ./
    RUN npm ci --silent
    
    COPY . .
    
    # --------------------
    # STAGE 2 — RUNTIME
    # --------------------
    FROM node:18-alpine
    WORKDIR /app
    
    ENV NODE_ENV=production
    
    COPY --from=builder /app /app
    
    EXPOSE 3000
    
    CMD ["node", "server.js"]
    