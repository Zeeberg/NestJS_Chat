FROM node:10-alpine AS builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install --only=prod

COPY . .

RUN npm run build

FROM node:10-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 8081 8080

CMD ["npm", "run", "start:prod"]
