const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config(); // Carga las variables de entorno desde el archivo .env

const app = express();
app.use(express.json());

// Usuarios predefinidos (solo para ejemplo)
const users = [
  {
    id: 1,
    username: 'user1',
    password: 'password1',
  },
  {
    id: 2,
    username: 'user2',
    password: 'password2',
  },
];

// Ruta para hacer el proceso de autenticación y generar el token JWT
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Buscar el usuario en el array de usuarios predefinidos
  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  // Crear el token JWT con el ID del usuario
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

  // Devolver el token en la respuesta
  res.json({ token });
});

// Middleware para proteger rutas
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token no proporcionado' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
}

// Ruta protegida que requiere el token en el header de autorización
app.get('/protected', authenticateToken, (req, res) => {
  // El usuario autenticado está disponible en req.user
  res.json({ message: 'Ruta protegida, acceso permitido', user: req.user });
});

// Ruta para la página de inicio
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la página de inicio!');
});

// Importar y utilizar los routers
const listViewRouter = require('./list-view-router');
const listEditRouter = require('./list-edit-router');
app.use('/list-view', validateParams, listViewRouter);
app.use('/list-edit', listEditRouter);

// Middleware para gestionar errores en los parámetros
function validateParams(req, res, next) {
  // Verificar aquí los parámetros en la solicitud y manejar los errores si es necesario
  // Por ejemplo, si se esperan parámetros específicos en la URL y no se encuentran, devolver un error
  next();
}

const port = 3000;
app.listen(port, () => {
  console.log(`Servidor Express iniciado en el puerto ${port}`);
});
