FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY . .
RUN yarn install
RUN yarn add dotenv-cli
RUN yarn add prisma
RUN yarn add prisma-docs-generator

EXPOSE 3000

ENTRYPOINT [ "npm",  "start"]
