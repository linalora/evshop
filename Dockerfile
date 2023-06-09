FROM node:16

# Create app directory
WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --omit=dev

# Bundle app source
COPY . .
ENV PORT=8080
EXPOSE ${PORT}

CMD "npm" "start"

