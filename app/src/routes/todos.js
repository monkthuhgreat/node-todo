const express = require('express');
const router = express.Router();
// Импорт модели Todo для работы с базой данных MongoDB
const Todo = require('../models/Todo');

// GET: Получить все задачи (URL: GET /api/todos/)
router.get('/', async (req, res) => {
    try {
        // Поиск всех задач и их сортировка. Новые будут вверху списка
        const todos = await Todo.find().sort({ createdAt: -1 });
        res.json(todos); // Отправка списка задач обратно в формате JSON
    } catch(err) {
        // Если произошла ошибка на сервере — статус 500
        res.status(500).json({ error: err.message });
    }
});

// POST: Создать новую задачу (URL: POST /api/todos/)
router.post('/', async (req, res) => {
    try {
        const { title } = req.body; // Сбор названия задачи из пришедшего запроса
        
        // Валидация: если поле пустое - статус 400 (Плохой запрос)
        if (!title) {
            return res.status(400).json({ errror: 'Title is required' });
        }
        
        // Создание новой задачи и последующее сохранение в базу данных
        const todo = new Todo({ title });
        await todo.save();
        
        res.status(201).json(todo); // Возврат созданной задачи со статусом 201 (Создано)
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// PUT: Обновить задачу по её ID (URL: PUT /api/todos/:id)
router.put('/:id', async (req, res) => {
    try {
        const { title, completed } = req.body; // Сбор новых данных из запроса
        
        // Поиск задачи по ID и последующее обновление. { new: true } возвращает уже измененный объект
        const todo = await Todo.findByIdAndUpdate(
            req.params.id,
            { title, completed },
            { new: true, runValidators: true }
        );
        
        // Если задачи с таким ID нет — статус 404
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json(todo); // Возврат обновленного объекта
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
});

// DELETE: Удалить задачу по её ID (URL: DELETE /api/todos/:id)
router.delete('/:id', async (req, res) => {
    try {
        // Поиск задачи по ее ID и последующее удаление из базы
        const todo = await Todo.findByIdAndDelete(req.params.id);
        
        // Если задачи не существовало - статус 404
        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }
        res.json({ message: 'Todo deleted successfully' }); // Успешный ответ
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Экспорт роутера для подключения в файле server.js
module.exports = router;