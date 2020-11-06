# ensure you specify your node version, that's mine
FROM node:12.13.1-alpine
# set working directory
WORKDIR /app/src/disxt-api
# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH
# install app dependencies
COPY package.json ./
RUN npm install --silent
# add app
COPY . ./
#Expose port and start application
EXPOSE 8080
CMD [ "npm", "start" ]
