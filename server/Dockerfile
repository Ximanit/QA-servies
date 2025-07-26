# Этап 1: Сборка приложения
FROM node:24-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package.json ./
COPY package-lock.json* ./

# Устанавливаем зависимости
RUN npm install --production

# Этап 2: Создание продакшен-образа
FROM node:24-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем зависимости из этапа сборки
COPY --from=builder /app/node_modules ./node_modules

# Копируем исходный код
COPY . .

# Создаем директорию для логов и загрузок
RUN mkdir -p logs Uploads

# Указываем порт
EXPOSE 3000

# Запускаем приложение
CMD ["node", "index.js"]