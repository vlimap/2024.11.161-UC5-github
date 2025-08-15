import VendasModel from "../models/vendas.model.js";

class VendasController {
  // Registrar Venda
  static async registrar(req, res) {
    try {
      const {
        cliente_id,
        colaborador_id,
        data,
        itens_venda,
        valor_total,
        pagamento_id,
      } = req.body;
      if (
        !cliente_id ||
        !colaborador_id ||
        !data ||
        !itens_venda ||
        !valor_total ||
        !pagamento_id ||
        typeof itens_venda !== "object"
      ) {
        return res
          .status(400)
          .json({ mensagem: "Todos os campos são obrigatórios!" });
      }
      await VendasModel.create({
        cliente_id,
        colaborador_id,
        data,
        itens_venda,
        valor_total,
        pagamento_id,
      });
      res.status(201).json({ mensagem: "Venda registrada com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Listar todos as vendas
  static async listarTodos(req, res) {
    try {
      const vendas = await VendasModel.findAll({
        order: [["criado_em", "DESC"]],
      });
      if (!vendas || vendas.length === 0) {
        return res.status(200).json({ mensagem: "Nenhuma venda encontrada!" });
      }
      res.status(200).json(vendas);
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Listar vendas por ID
  static async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const vendas = await VendasModel.findByPk(id);
      if (!vendas) {
        return res.status(404).json({ mensagem: "Venda não encontrada!" });
      }
      res.status(200).json(vendas);
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Atualizar venda por ID
  static async atualizar(req, res) {
    try {
      const {
        cliente_id,
        colaborador_id,
        data,
        itens_venda,
        valor_total,
        pagamento_id,
      } = req.body;
      const { id } = req.params;
      const resultado = await VendasModel.update(
        {
          cliente_id,
          colaborador_id,
          data,
          itens_venda,
          valor_total,
          pagamento_id,
        },
        { where: { id } }
      );
      if (!resultado[0]) {
        return res.status(404).json({ mensagem: "Venda não encontrada!" });
      }
      res.status(200).json({ mensagem: "Venda atualizada com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Deletar venda por ID
  static async deletarPorId(req, res) {
    try {
      const { id } = req.params;
      const resultado = await VendasModel.destroy({ where: { id } });
      if (!resultado) {
        return res.status(404).json({ mensagem: "Venda não encontrada!" });
      }
      res.status(200).json({ mensagem: "Venda excluída com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Deletar todas as vendas
  static async deletarTodos(req, res) {
    try {
      await VendasModel.destroy({ truncate: true });
      res.status(200).json({ mensagem: "Todas as vendas foram deletadas!" });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }
}

export default VendasController;
