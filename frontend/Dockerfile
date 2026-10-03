# Build stage
FROM node:22-alpine AS build
WORKDIR /app

RUN npm install -g pnpm@11.6.0

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN CI=true pnpm build

# Serve stage
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/mcdashboard/browser /usr/share/nginx/html
EXPOSE 80