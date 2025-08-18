// Arquivo principal do sistema de barbearia
import dotenv from "dotenv";
import express from "express";

dotenv.config();
const app = express();

app.use(express.json());

// Rotas principais (exemplo)
// Rotas dos módulos
// import agendaRoutes from './src/modules/agenda/routes.js';
// import clientesRoutes from './src/modules/clientes/routes.js';

// import autenticacaoRoutes from './src/modules/autenticacao/routes.js';

// app.use('/agenda', agendaRoutes);
// app.use('/clientes', clientesRoutes);
// app.use('/colaboradores', colaboradoresRoutes);
// app.use('/servicos', servicosRoutes);

// app.use('/autenticacao', autenticacaoRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
