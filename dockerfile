# Используем официальный образ Playwright, уже настроенный
FROM mcr.microsoft.com/playwright:v1.56.1-focal

# Устанавливаем рабочую директорию внутри контейнера
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем весь проект в контейнер
COPY . .

# По умолчанию запускается команда для запуска тестов
CMD ["npm", "test"]