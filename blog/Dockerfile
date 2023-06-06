FROM node:16-alpine

COPY package.json .
RUN npm run clean
COPY . .

RUN npm run build

CMD ["npm", "run", "start"]