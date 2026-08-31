# Используется легковесный образ Alpine для быстрой сборки
FROM node:20-alpine AS builder

# Установка рабочей директории внутри контейнера
WORKDIR /app

# Копирование package.json и package-lock.json для кеширования слоев
# Копируются именно они, чтобы не переустанавливать зависимости при каждом изменении кода
COPY package*.json ./

# Устанавливаются только production зависимости
# --frozen-lockfile использует точные версии из package-lock.json
RUN npm ci --only=production --frozen-lockfile

# Создается чистый, минимальный образ 
FROM node:20-alpine

# Установка переменной окружения для production-режима
ENV NODE_ENV=production

# Создание рабочей директории с переходом в нее
WORKDIR /app

# Копирование всего остального кода
COPY . .

# Запуск приложения от непривилегированного пользователя с UID 1001
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# Смена владельца всех файлов на созданного пользователя
# Нужно для того, чтобы приложение могло читать и писать файлы
RUN chown -R nodejs:nodejs /app

# Переключение на созданного пользователя
USER nodejs

# Документирование порта, слушаемого приложением
EXPOSE 5000

# Запуск приложения
# node - запускает приложение
# src/server.js - точка входа
CMD ["node", "src/server.js"]