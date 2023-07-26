const express = require('express');
const listEditRouter = express.Router();

// Middleware para manejar errores en solicitudes POST y PUT
function validateTask(req, res, next) {
  if (req.method === "POST" || req.method === "PUT") {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Cuerpo de solicitud vacío" });
    } else if (!req.body.isCompleted || !req.body.description) {
      return res.status(400).json({ error: "Información no válida o atributos faltantes" });
    }
  }
  next();
}

// Ruta para crear una tarea (POST)
listEditRouter.post('/create', validateTask, (req, res) => {
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
listEditRouter.put('/update/:taskId', validateTask, (req, res) => {
  const taskId = req.params.taskId;
  // Lógica para actualizar una tarea con el ID especificado
  res.send(`Tarea con ID ${taskId} actualizada`);
});

module.exports = listEditRouter;
