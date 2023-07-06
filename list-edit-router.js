const express = require('express');
const listEditRouter = express.Router();

// Ruta para crear una tarea (POST)
listEditRouter.post('/create', (req, res) => {
  // Lógica para crear una tarea
  res.send('Tarea creada exitosamente');
});

// Ruta para eliminar una tarea (DELETE)
listEditRouter.delete('/delete/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  // Lógica para eliminar una tarea con el ID especificado
  res.send(`Tarea con ID ${taskId} eliminada`);
});

// Ruta para actualizar una tarea (PUT)
listEditRouter.put('/update/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  // Lógica para actualizar una tarea con el ID especificado
  res.send(`Tarea con ID ${taskId} actualizada`);
});

module.exports = listEditRouter;
