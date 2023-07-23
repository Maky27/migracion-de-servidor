const express = require('express');
const app = express();

// Middleware a nivel de aplicación para validar los métodos HTTP
function validateMethod(req, res, next) {
  if (["GET", "POST", "PUT", "DELETE"].indexOf(req.method) === -1) {
    return res.status(400).json({ error: "Método HTTP inválido" });
  }
  next();
}

// Middleware para manejar errores de parámetros en list-view-router
function validateParams(req, res, next) {
  // Verificar aquí los parámetros en la solicitud y manejar los errores si es necesario
  // Por ejemplo, si se esperan parámetros específicos en la URL y no se encuentran, devolver un error
  next();
}

const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');

app.use(express.json());

// Implementar el middleware a nivel de aplicación
app.use(validateMethod);

// Implementar los routers
app.use('/list-view', validateParams, listViewRouter);
app.use('/list-edit', listEditRouter);

// Iniciar el servidor
const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});
