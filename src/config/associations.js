import ClientModel from "../modules/clientes/models/cliente.model.js"
import AgendaModel from "../../src/modules/agenda/models/agenda.model.js"
import ColaboradorModel from "../modules/colaboradores/models/colaborador.models"
import EstoqueModel from "../modules/estoque/models/estoque.model.js"
import Pagamento from "../modules/pagamentos/models/pagamento.model.js"
import ProdutosModel from "../modules/produto/models/produto.model.js"
import RelatorioModel from "../modules/relatorios/models/relatorio.model"
import ServicoModel from "../modules/relatorios/models/relatorio.model.js"
import UsuarioModel from "../modules/usuario/models/usuario.model.js"
import VendasModel from "../modules/vendas/models/vendas.model.js"


// Associação Colaborador 1:N Agendamento
ColaboradorModel.hasMany(AgendaModel, {
  foreignKey: "colaboradorId",
  as: "agendamentos",
  onDelete: "RESTRICT", // evita excluir colaborador se houver agendamentos
  onUpdate: "CASCADE"
});

AgendaModel.belongsTo(ColaboradorModel, {
  foreignKey: "colaboradorId",
  as: "colaborador"
});

// Associação Colaborador 1:N Venda
ColaboradorModel.hasMany(VendaModel, {
  foreignKey: "colaboradorId",
  as: "vendas",
  onDelete: "RESTRICT", // evita excluir colaborador se houver vendas
  onUpdate: "CASCADE"
});

VendasModel.belongsTo(ColaboradorModel, {
  foreignKey: "colaboradorId",
  as: "colaborador"
});