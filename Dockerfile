# Build stage #
FROM node:20 as Builder
WORKDIR /app
COPY . .
RUN npm i
RUN npm run build

# Run stage #

FROM nginx as Production

COPY --from=Builder /app/build /usr/share/nginx/html
EXPOSE 80