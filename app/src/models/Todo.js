const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Регистрация схемы как модель с именем 'Todo' и экспорт для использования в роутах
module.exports = mongoose.model('Todo', todoSchema);
