FROM node:20-alpine
WORKDIR /app
COPY package.json index.mjs smithery.yaml README.md ./
USER node
ENTRYPOINT ["node", "index.mjs"]
