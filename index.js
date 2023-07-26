const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Lista de tareas (solo para ejemplo, puedes utilizar una base de datos para almacenar las tareas)
let tasks = [
  {
    id: 1,
    description: 'Completar tarea 1',
    isCompleted: false,
  },
  {
    id: 2,
    description: 'Completar tarea 2',
    isCompleted: false,
  },
];

// Ruta para crear una nueva tarea
app.post('/tasks', (req, res) => {
  const { description } = req.body;

  if (!description) {
    return res.status(400).json({ error: 'La descripción de la tarea es obligatoria' });
  }

  const newTask = {
    id: tasks.length + 1,
    description,
    isCompleted: false,
  };

  tasks.push(newTask);

  res.status(201).json(newTask);
});

// Ruta para actualizar una tarea
app.put('/tasks/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);
  const { description, isCompleted } = req.body;

  const taskToUpdate = tasks.find(task => task.id === taskId);

  if (!taskToUpdate) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  if (description) {
    taskToUpdate.description = description;
  }

  if (isCompleted !== undefined) {
    taskToUpdate.isCompleted = isCompleted;
  }

  res.json(taskToUpdate);
});

// Ruta para eliminar una tarea
app.delete('/tasks/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);

  const taskIndex = tasks.findIndex(task => task.id === taskId);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tasks.splice(taskIndex, 1);

  res.json({ message: 'Tarea eliminada exitosamente' });
});

// Ruta para listar todas las tareas
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Ruta para listar tareas completas
app.get('/tasks/completed', (req, res) => {
  const completedTasks = tasks.filter(task => task.isCompleted);
  res.json(completedTasks);
});

// Ruta para listar tareas incompletas
app.get('/tasks/incomplete', (req, res) => {
  const incompleteTasks = tasks.filter(task => !task.isCompleted);
  res.json(incompleteTasks);
});

// Ruta para obtener una sola tarea por su ID
app.get('/tasks/:taskId', (req, res) => {
  const taskId = parseInt(req.params.taskId);

  const task = tasks.find(task => task.id === taskId);

  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  res.json(task);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});
