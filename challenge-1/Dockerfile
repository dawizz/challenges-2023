FROM node:18 AS build-env
WORKDIR /app

COPY --chown=node:node ./package.json .
COPY --chown=node:node ./package-lock.json .

RUN npm ci --omit=dev

COPY --chown=node:node index.js .

######################
FROM gcr.io/distroless/nodejs18-debian12

COPY --from=build-env /app /app
WORKDIR /app

EXPOSE 3000
CMD ["index.js"]
