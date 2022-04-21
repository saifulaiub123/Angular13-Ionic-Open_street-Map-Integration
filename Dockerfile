FROM node:latest as build

RUN mkdir -p /app

WORKDIR /app

# RUN npm install -g @angular/cli

COPY  package.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:latest as runtime

COPY --from=build /app/www /usr/share/nginx/html


