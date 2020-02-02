# Use an official node runtime as a parent image
FROM node:12

WORKDIR /app/

# Install dependencies
COPY package.json yarn.lock ./

RUN yarn install

COPY . ./

EXPOSE 3000

CMD yarn start