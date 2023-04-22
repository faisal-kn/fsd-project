FROM node:17

#create work directory
WORKDIR /usr/src/app

#copy package.json and package-lock.json
COPY package*.json ./

#install prettier
RUN npm install -g prettier

#install dependencies
RUN npm install

#copy source code
COPY . .

#build app
# RUN npm run build

#expose port 3001
EXPOSE 3001

CMD ["node", "server.js"]
