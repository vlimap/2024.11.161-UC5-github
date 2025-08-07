// Arquivo principal do sistema de barbearia
require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// Rotas principais (exemplo)
// app.use('/clientes', require('./modules/clientes/routes'));
// app.use('/agenda', require('./modules/agenda/routes'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
