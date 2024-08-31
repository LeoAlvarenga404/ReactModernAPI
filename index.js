const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const estudoRoutes = require('./routes/estudoRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// cors - permitir solicitações de outros domínios
const allowedOrigins = [
  'http://localhost:5174',
  'https://react-modern-nfyyzlcz1-leoalvarenga404s-projects.vercel.app/', // Adicione outras origens permitidas aqui
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Permite a origem
    } else {
      callback(new Error('Not allowed by CORS')); // Rejeita a origem
    }
  }
}));

app.use('/estudos', estudoRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
