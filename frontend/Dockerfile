FROM nginx:latest
COPY /frontend/dist /usr/share/nginx/html
COPY /frontend/default.conf /etc/nginx/conf.d/default.conf
ENTRYPOINT ["nginx", "-g", "daemon off;"]