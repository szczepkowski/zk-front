FROM nginx:1.17.1-alpine
COPY /dist/goreit-front /usr/share/nginx/html
