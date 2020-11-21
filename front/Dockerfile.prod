FROM node:12.18.4-alpine3.11

WORKDIR /usr/src/app
RUN echo "environnement: production"

COPY package*.json /usr/src/app/
RUN npm install
RUN npm install -g serve
COPY . /usr/src/app/

RUN npm run build
ADD build build

EXPOSE 3000
CMD [ "serve", "-l", "3000", "build/"]