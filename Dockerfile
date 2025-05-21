# Fase 1: Build
FROM node:23-alpine AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Fase 2: Avvio produzione
FROM node:23-alpine AS runner

WORKDIR /app
ENV NODE_ENV=production

COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app ./

EXPOSE 3000

CMD ["npm", "start"]
