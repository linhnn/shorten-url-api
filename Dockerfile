FROM node:10

# Create app directory
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
RUN npm install

# airbnb eslint
# RUN export PKG=eslint-config-airbnb; npm info "$PKG@latest" peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs npm install --save-dev "$PKG@latest"

# Bundle app source
COPY . .

# Exports
EXPOSE 3001
CMD ["npm", "start"]
