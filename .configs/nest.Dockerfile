FROM node:18-alpine
RUN apk update
WORKDIR /opt/
COPY package*.json .
ARG HUSKY=0
ARG NODE_ENV=production
WORKDIR /opt/backend
COPY backend/ .
WORKDIR /opt/
RUN rm -rf ./backend/dist && npm ci && npm run build:server
COPY .configs/env/.env /opt/backend/dist/
EXPOSE 2000
CMD ["npm", "run", "prod:server"]
