# Step 1: build
FROM node:20 AS builder
WORKDIR /app 

COPY package*.json ./
RUN npm ci 

COPY prisma ./prisma
COPY public ./public
COPY app ./app
COPY lib ./lib
COPY ui ./ui
COPY next.config.ts ./
COPY tsconfig.json ./
COPY eslint.config.mjs ./
COPY postcss.config.mjs ./

# Copy environment file and database (SQLite)
COPY .env ./
# COPY dev.db ./    
RUN npx prisma generate
RUN npm run build

# Step 2: run
FROM node:20-slim AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public

EXPOSE 3000
CMD ["npm", "run", "start"]
