FROM node:10.17.0

COPY ./lib/* /opt/stub/lib/
COPY ./package.json /opt/stub/package.json
COPY ./yarn.lock /opt/stub/yarn.lock

WORKDIR /opt/stub
RUN yarn

CMD ["npm", "run", "start"]
