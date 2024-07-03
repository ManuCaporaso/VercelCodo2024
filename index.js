const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const clientesRouter = require('./routes/clientes');
const app = express();

// Cargar variables de entorno desde .env
dotenv.config();

// Middleware para manejar JSON y archivos estáticos
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para clientes
app.use('/clientes', clientesRouter);

// Ruta de inicio
app.get('/', (req, res) => {
    res.send('Bienvenido a mi aplicación CRUD');
});

// Configurar el puerto
const PORT = process.env.PORT || 3000;

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});
