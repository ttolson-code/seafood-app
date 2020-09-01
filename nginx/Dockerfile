FROM nginx:latest

COPY nginx-default.conf.template /etc/nginx/conf.d/default.conf.template
COPY entrypoint.sh /

ENTRYPOINT ["/entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]
