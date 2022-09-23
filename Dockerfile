FROM node:latest

# Create app directory
RUN mkdir -p /usr/src/bot
WORKDIR /usr/src/bot

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json /usr/src/bot


RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . /usr/src/bot


CMD [ "node", "main.js" ]
