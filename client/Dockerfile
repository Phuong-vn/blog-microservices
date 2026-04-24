FROM node:24.15-alpine3.22
ENV CI=true
ENV BROWSER=none
ENV WDS_SOCKET_PORT=0
WORKDIR /src/app/
COPY package.json ./
RUN npm install
COPY ./ ./
CMD ["npm", "start"]