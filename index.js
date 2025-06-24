const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();

// Habilita CORS y JSON
app.use(cors());
app.use(express.json());

// RUTA: Obtener todas las tareas
app.get('/api/tareas', async (req, res) => {
  const tareas = await prisma.tareas.findMany();
  res.json(tareas);
});

// RUTA: Crear nueva tarea
app.post('/api/tareas', async (req, res) => {
  const { descripcion } = req.body;
  const tarea = await prisma.tareas.create({
    data: { descripcion }
  });
  res.json(tarea);
});

// RUTA: Eliminar tarea
app.delete('/api/tareas/:id', async (req, res) => {
  const { id } = req.params;
  await prisma.tareas.delete({ where: { id: parseInt(id) } });
  res.json({ mensaje: 'Tarea eliminada' });
});

// Iniciar servidor
const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
