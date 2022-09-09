FROM node:16-alpine
WORKDIR /opt/app
ADD package.json package.json
RUN npm install --force
ADD . .
ENV NODE_ENV production
RUN mpm run build
RUN npm prune --production
CMD ["npm", "start"]
EXPOSE 3000