const express = require('express');
const listViewRouter = express.Router();

// Middleware para gestionar errores en los parámetros
function validateParams(req, res, next) {
  // Verificar aquí los parámetros en la solicitud y manejar los errores si es necesario
  // Por ejemplo, si se esperan parámetros específicos en la URL y no se encuentran, devolver un error
  next();
}

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
