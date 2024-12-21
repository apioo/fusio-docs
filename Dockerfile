FROM node:alpine as node
ENV NODE_OPTIONS=--openssl-legacy-provider
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
EXPOSE 80
CMD ["npm", "run", "serve", "--", "--port", "80", "--host", "0.0.0.0"]
