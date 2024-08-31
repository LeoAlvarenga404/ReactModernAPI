const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const estudoRoutes = require('./routes/estudoRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// cors - permitir solicitações de outros domínios
app.use(cors({
  origin: 'http://localhost:5174', // Ajuste para o domínio do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos permitidos
  allowedHeaders: ['Content-Type', 'Authorization'] // Cabeçalhos permitidos
}));

app.use('/estudos', estudoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
