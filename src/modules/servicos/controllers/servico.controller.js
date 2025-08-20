import ServicoModel from "../models/servico.model.js";

class ServicoController {
  static async cadastrar(req, res) {
    try {
      const { nome, descricao, preco, duracao, status } = req.body;
      if (!nome || !descricao || !preco || !duracao) {
        return res.status(400).json({ mensagem: "Campos obrigatórios: nome, descricao, preco e duracao." });
      }
      const servico = await ServicoModel.create({ nome, descricao, preco, duracao, status });
      res.status(201).json({ mensagem: "Serviço cadastrado com sucesso!", servico });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao cadastrar serviço.", erro: error.message });
    }
  }

  static async listarTodos(req, res) {
    try {
      const servicos = await ServicoModel.findAll();
      if (servicos.length === 0) {
        return res.status(200).json({ mensagem: "Nenhum serviço encontrado." });
      }
      res.status(200).json(servicos);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao listar serviços.", erro: error.message });
    }
  }

  static async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const servico = await ServicoModel.findByPk(id);
      if (!servico) {
        return res.status(404).json({ mensagem: "Serviço não encontrado." });
      }
      res.status(200).json(servico);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao buscar serviço.", erro: error.message });
    }
  }

  static async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, preco, duracao, status } = req.body;
      const atualizado = await ServicoModel.update(
        { nome, descricao, preco, duracao, status },
        { where: { id } }
      );
      if (atualizado[0] === 0) {
        return res.status(404).json({ mensagem: "Serviço não encontrado para atualização." });
      }
      res.status(200).json({ mensagem: "Serviço atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao atualizar serviço.", erro: error.message });
    }
  }

  static async deletarPorId(req, res) {
    try {
      const { id } = req.params;
      const deletado = await ServicoModel.destroy({ where: { id } });
      if (!deletado) {
        return res.status(404).json({ mensagem: "Serviço não encontrado para exclusão." });
      }
      res.status(200).json({ mensagem: "Serviço excluído com sucesso!" });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao excluir serviço.", erro: error.message });
    }
  }

  static async deletarTodos(req, res) {
    try {
      await ServicoModel.destroy({ truncate: true });
      res.status(200).json({ mensagem: "Todos os serviços foram excluídos!" });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro ao excluir todos os serviços.", erro: error.message });
    }
  }
}

export default ServicoController;