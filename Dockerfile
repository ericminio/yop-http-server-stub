FROM node:14.17.1

COPY ./lib/* /opt/stub/lib/
COPY ./package.json /opt/stub/package.json
COPY ./package-lock.json /opt/stub/package-lock.json

WORKDIR /opt/stub
RUN npm install

CMD ["npm", "run", "start"]
