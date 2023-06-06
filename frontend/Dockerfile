FROM node:16-alpine

COPY package.json .
RUN npm run clean
COPY . .

ARG OAUTH_CLIENT_ID
RUN npm run build

CMD ["npm", "run", "start"]