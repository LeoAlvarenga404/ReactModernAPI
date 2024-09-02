const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const estudoRoutes = require('./routes/estudoRoutes');
const authRoutes = require('./routes/userRoutes');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use(cors({
  origin: '*', 
}));

app.use('/estudos', estudoRoutes);
app.use('/usuarios', authRoutes);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});


// {
//   "nome": "João Silva",
//   "email": "joao.silva@example.com",
//   "senha": "senha123" 
// }

// {
//   "nome": "Estudo sobre JavaScript",
//   "porcentagem": 50,
//   "tempoEstimado": 300,
//   "status": "Em andamento",
//   "userId": 1
// }
