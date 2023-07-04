const express = require('express');
const app = express();

// Ruta para obtener la lista de tareas
app.get('/tasks', (req, res) => {
  const tasks = [
    {
      id: '123456',
      isCompleted: false,
      description: 'Walk the dog',
    },
  ];

  res.json(tasks);
});

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});