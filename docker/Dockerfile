FROM nginx:alpine

COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/server.conf /etc/nginx/conf.d/default.conf
COPY ./build /usr/share/nginx/html/
