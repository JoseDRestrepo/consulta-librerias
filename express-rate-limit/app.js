const express = require('express');
const app = express();
const rateLimit = require('express-rate-limit');
const PORT = 4000;

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 5,
    message: {
        error: 'Demasiadas solicitudes, por favor intente de nuevo más tarde.'
    }
});

app.use(limiter)

//ejemplo de limitador para una ruta específica (PUT)
const putLimiter = rateLimit({
    windowMs: 5 * 60 * 1000, 
    max: 2, 
    message: {
        error: 'Demasiadas solicitudes PUT, por favor intente de nuevo más tarde.'
    }
});

app.use('/api/users/:id', putLimiter);

// Middleware para leer JSON
app.use(express.json());

// Simulación de base de datos en memoria
let users = [
  { id: 1, name: 'Ana' },
  { id: 2, name: 'Luis' }
];

// Rutas básicas

// GET - Obtener todos los usuarios
app.get('/api/users', (req, res) => {
  res.json(users);
});

// GET - Obtener un usuario por ID
app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(user);
});

// POST - Crear un nuevo usuario
app.post('/api/users', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'El nombre es obligatorio' });

  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Actualizar un usuario
app.put('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  const { name } = req.body;
  if (!name) return res.status(400).json({ error: 'El nombre es obligatorio' });

  user.name = name;
  res.json(user);
});

// DELETE - Eliminar un usuario
app.delete('/api/users/:id', (req, res) => {
  const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
  if (userIndex === -1) return res.status(404).json({ error: 'Usuario no encontrado' });

  users.splice(userIndex, 1);
  res.json({ message: 'Usuario eliminado' });
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});


