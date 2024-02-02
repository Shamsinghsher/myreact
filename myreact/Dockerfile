FROM node:alpine3.19

COPY src  /usr/src/app/src/
COPY public /usr/src/app/public/
COPY package*.json /usr/src/app
# RUN mkdir -p /home/app
# COPY . /home/app


WORKDIR /usr/src/app
RUN npm install
EXPOSE 4000
CMD [ "npm","start" ] 

