FROM node:20-alpine as build

WORKDIR /app
COPY package.json /app/package.json
COPY package-lock.json /app/package-lock.json
RUN npm ci && npm cache clean --force
COPY . /app
RUN source .env.production
RUN npm run build

# package only the build folder
FROM joseluisq/static-web-server:2-alpine

WORKDIR /public
COPY --from=build /app/dist /public
EXPOSE 80
