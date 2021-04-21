FROM nginx
COPY build /usr/share/nginx/html



# FROM node as build
# WORKDIR /app
# COPY . .
# WORKDIR /app/packages/reactapp

# ARG REACT_APP_BACKEND_API_ARG
# ENV REACT_APP_BACKEND_API=$REACT_APP_BACKEND_API_ARG

# RUN yarn
# RUN yarn build

# FROM nginx:alpine
# COPY --from=build /app/packages/reactapp/build /usr/share/nginx/html

# ARG NGINX_ENV_CONF
# COPY nginx.$NGINX_ENV_CONF.conf /etc/nginx/nginx.conf
# #COPY .htpasswd /etc/apache2/.htpasswd

# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]