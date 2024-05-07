ARG BUILD_ENV=local

FROM node:20-slim as base
RUN mkdir /next
WORKDIR /next
COPY ../../ /next/
RUN npm i

FROM base as local
CMD ["npm", "run", "dev"]

FROM base as production
CMD ["npm", "run", "start"]

FROM ${BUILD_ENV}