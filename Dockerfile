FROM node:16
WORKDIR /app
COPY package.json yarn.lock ./

RUN yarn
COPY . ./
RUN yarn build
RUN chmod +x ./docker/wait-for-it.sh ./docker/entrypoint.sh

ENTRYPOINT ["./docker/entrypoint.sh"]
CMD ["yarn", "run-dist"]
