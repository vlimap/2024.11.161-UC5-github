import EstoqueModel from "../models/estoque.model";


class Estoque {
  // Criar estoque
  static async criar(req, res) {
    try {
      const { produto_id, quantidade, localizacao, data_entrada, data_saida } = req.body;
      if (!produto_id) {
        return res.status(400).json({ mensagem: "produto_id(id do estoque) é obrigatório!" });
        }
    // Verifica se o usuário existe
      const id = await EstoqueModel.findByPk(produto_id);
      if (!id) {
        return res.status(404).json({ mensagem: "Produto não encontrado!" });
      }
      // Cria o estoque
      const estoque = await EstoqueModel.create({ produto_id, quantidade, localizacao, data_entrada, data_saida });
      res.status(201).json({ mensagem: "Estoque criado com sucesso!", Estoque });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Listar todos os estoque
  static async listarTodos(req, res) {
    try {
      const estoque = await EstoqueModel.findAll();
      if (!estoque || estoque.length === 0) {
        return res.status(200).json({ mensagem: "Nenhum estoque encontrado!" });
      }
      res.status(200).json(estoque);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Listar estoque por ID
  static async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const estoque = await EstoqueModel.findByPk(id);
      if (!estoque) {
        return res.status(404).json({ mensagem: "estoque não encontrado!" });
      }
      res.status(200).json(estoque);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Atualizar estoque por ID
  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { quantidade, localizacao, data_saida } = req.body;
      const resultado = await EstoqueModel.update(
        { bio, site_pessoal, data_nascimento },
        { where: { id } }
      );
      if (!resultado === 0) {
        return res.status(404).json({ mensagem: "estoque não encontrado!" });
      }
      res.status(200).json({ mensagem: "estoque atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Deletar estoque por ID
  static async deletarPorId(req, res) {
    try {
      const { id } = req.params;
      const resultado = await EstoqueModel.destroy({ where: { id } });
      if (!resultado) {
        return res.status(404).json({ mensagem: "estoque não encontrado!" });
      }
      res.status(200).json({ mensagem: "estoque excluído com sucesso!" });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Contar total de perfis
  static async totalPerfis(req, res) {
    try {
      const total = await EstoqueModel.count();
      res.status(200).json({ total });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }
}

export default Estoque;
