const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const estudoRoutes = require('./routes/estudoRoutes');
const authRoutes = require('./routes/userRoutes');
const errorHandler = require('./middlewares/errorHandler');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors({ origin: '*' }));

// exportei esses arquivos do routes e dentro dele tem cada caminho com seus http requests.
app.use('/estudos', estudoRoutes);
app.use('/usuarios', authRoutes);

// middleware para mostrar erro do servidor.
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
