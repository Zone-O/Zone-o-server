FROM node:16-alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
RUN yarn install

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "yarn", "start" ]
