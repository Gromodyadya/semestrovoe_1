# Этап 1: Сборка приложения
FROM node:18-alpine as builder
WORKDIR /app
COPY package.json yarn.lock ./
# Или если используешь npm:
# COPY package.json package-lock.json ./

RUN yarn install --frozen-lockfile
# Или если используешь npm:
# RUN npm ci

COPY . .
RUN yarn build
# Или если используешь npm:
# RUN npm run build

# Этап 2: Запуск приложения на Nginx
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
# Если у тебя роутинг на стороне клиента (React Router), добавь конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]