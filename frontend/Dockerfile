
FROM node:23-alpine AS build

WORKDIR /app

COPY ./package.json .
RUN npm install

COPY . .
ENV NODE_ENV=production
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
