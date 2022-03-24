FROM alpine:edge AS base
# install node
RUN apk add --no-cache nodejs npm tini
# set working directory
WORKDIR /var/www
# Set tini as entrypoint
ENTRYPOINT ["/sbin/tini", "--"]
# copy project file
COPY package.json .
COPY pnpm-lock.yaml .

# ---- Build App ----
FROM base AS build
#install pnpm
RUN npm install -g pnpm
# install node packages
RUN pnpm i --production
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN pnpm i
# build
COPY . .
# COPY .env.example .env
RUN pnpm build

# ---- Release ----
FROM base AS release
# copy app config
# COPY .env.example .env
# copy production node_modules
COPY --from=build /var/www/prod_node_modules node_modules
# copy app dist build
COPY --from=build /var/www/dist dist
# expose port and define CMD
EXPOSE 8000
CMD npm run start