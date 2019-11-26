From registry.yonghui.cn/public/nginx:latest

MAINTAINER Kellerman <80816284@yonghui.com>

RUN ls
RUN ls  ./dist
ADD ./dist /var/www/mw/dist
COPY ./nginx/gzip.conf /etc/nginx/gzip.conf
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /etc/nginx/conf.d/default.conf
