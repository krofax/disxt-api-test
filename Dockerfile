# ensure you specify your node version, that's mine
FROM node:12.13.1-alpine
# set working directory
WORKDIR /app/src/disxt-api
# install app dependencies
COPY package.json ./
RUN npm install --silent
# add app
COPY . ./
CMD [ "npm", "start" ]

