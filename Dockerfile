From registry.yonghui.cn/public/nginx:latest

MAINTAINER Kellerman <80816284@yonghui.com>

ADD ./build/dist /var/www/mw/dist
COPY ./nginx/gzip.conf /etc/nginx/gzip.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
ADD  ./nginx/conf.d  /etc/nginx/conf.d
