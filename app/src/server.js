const express = require('express');   // Главный фреймворк для создания веб-сервера
const mongoose = require('mongoose'); // Библиотека для удобной работы с базой данных MongoDB
const cors = require('cors');         // Разрешает внешним сайтам делать запросы к этому API
require('dotenv').config();

// Импорт готовых маршрутов (роутов) для задач из соседней папки
const todoRoutes = require('./routes/todos');

const app = express();

const PORT = process.env.PORT || 5000;

// Подключение промежуточных функций (Middleware)
app.use(cors());          // Активируем CORS (разрешение на запросы с других адресов)
app.use(express.json());  // Учим сервер понимать JSON-формат в теле запросов (req.body)

// Подключение к базе данных MongoDB
// Адрес базы данных (MONGODB_URI) не пишется в коде ради безопасности, а передается снаружи
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB')) 
  .catch(err => console.error('MongoDB connection error:', err)); 

// Привязка маршрутов
// Все запросы, которые начинаются с '/api/todos', отправляются в файл 'todoRoutes'
// Пример: GET /api/todos (получить список) или POST /api/todos (создать)
app.use('/api/todos', todoRoutes);

// Главная (корневая) страница сервера
// Нужна для быстрой проверки: если при переходе на localhost:5000 возвращается этот JSON, значит сервер работает
app.get('/', (req, res) => {
    res.json({ message: 'Todo API is running' });
});

// Запуск сервера на указанном порту
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});