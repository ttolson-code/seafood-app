#!/usr/bin/env sh
set -eu

envsubst '${FRONT_END}','${BACK_END}','${FRONT_END_PORT}','${BACK_END_PORT}','${FRONT_END_DOMAIN}','${BACK_END_DOMAIN}','${NGINX_PORT}' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf

exec "$@"
