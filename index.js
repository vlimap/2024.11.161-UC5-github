// Arquivo principal do sistema de barbearia
import dotenv from "dotenv";
import express from "express";

import './config/database.js'

dotenv.config();
const app = express();

app.use(express.json());

// Rotas principais (exemplo)
// Rotas dos módulos
// import agendaRoutes from './src/modules/agenda/routes.js';
// import clientesRoutes from './src/modules/cliente/routes/cliente.route.js'

// import servicosRoutes from './src/modules/servicos/routes.js';
// import produtosRoutes from './src/modules/produto/routes/produto.route.js';
// import vendasRoutes from './src/modules/vendas/routes.js';
// import pagamentosRoutes from './src/modules/pagamentos/routes.js';

// import autenticacaoRoutes from './src/modules/autenticacao/routes.js';

// app.use('/agenda', agendaRoutes);
// app.use('/cliente', clientesRoutes);
// app.use('/colaboradores', colaboradoresRoutes);
// app.use('/servicos', servicosRoutes);
// app.use('/produtos', produtosRoutes);
// app.use('/vendas', vendasRoutes);
// app.use('/pagamentos', pagamentosRoutes);

// app.use('/autenticacao', autenticacaoRoutes);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});