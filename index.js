const express = require('express');
const app = express();

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

// Implementar los routers
app.use('/list-view', listViewRouter);
app.use('/list-edit', listEditRouter);

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});
