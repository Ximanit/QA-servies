# Этап 1: Сборка приложения
FROM node:24-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json (если есть)
COPY package.json ./
COPY package-lock.json* ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем приложение для продакшена
RUN npm run build

# Этап 2: Создание продакшен-образа
FROM node:24-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Устанавливаем serve для раздачи статических файлов
RUN npm install -g serve

# Копируем собранные файлы из предыдущего этапа
COPY --from=builder /app/dist ./dist

# Указываем порт, который будет использоваться
EXPOSE 3000

# Запускаем приложение
CMD ["serve", "-s", "dist", "-l", "3000"]