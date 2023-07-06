const express = require('express');
const listViewRouter = express.Router();

// Ruta para obtener las tareas completas
listViewRouter.get('/completed', (req, res) => {
  const completedTasks = [
    {
      id: '789012',
      isCompleted: true,
      description: 'Finish homework',
    },
  ];

  res.json(completedTasks);
});

// Ruta para obtener las tareas incompletas
listViewRouter.get('/incomplete', (req, res) => {
  const incompleteTasks = [
    {
      id: '345678',
      isCompleted: false,
      description: 'Buy groceries',
    },
  ];

  res.json(incompleteTasks);
});

module.exports = listViewRouter;
