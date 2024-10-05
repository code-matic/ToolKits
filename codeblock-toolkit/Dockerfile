FROM node:22-alpine

WORKDIR /cloudbuild-generator

COPY cloudbuild-generator/.env .

COPY ./codeblock-toolkit .

RUN npm install

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "dev", "--", "--port", "8080", "--host"]