# Step 1: build
FROM node:20 AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY prisma ./prisma
COPY public ./public
COPY src ./src
COPY src/next.config.js ./
RUN npx prisma generate
RUN npm run build

# Step 2: run
FROM node:20-slim AS runner
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/prisma ./prisma
COPY --from=builder /app/public ./public

ENV NODE_ENV=production
EXPOSE 3000
CMD ["npm", "run", "start"]
