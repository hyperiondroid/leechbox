FROM node:14.16.0
ENV NODE_ENV=production

WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 9090
CMD [ "node", "server/index.js" ]