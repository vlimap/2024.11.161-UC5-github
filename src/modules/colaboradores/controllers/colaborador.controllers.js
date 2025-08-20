import bcrypt from "bcryptjs";
import ColaboradorModel from "../models/colaborador.models";

class ColaboradorController {
  // Cadastrar do colaborador
  static async cadastrar(req, res) {
    try {
      const { nome, especialidade, telefone, email, data_admissao, status, senha } = req.body;
      if (!nome || !especialidade || !telefone || !email || !data_admissao || !senha) {
        return res.status(400).json({ mensagem: "Nome, especialidade, telefone, e-mail, data de admissão e senha são obrigatórios!" });
      }
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(senha, salt);

      const colaborador = await ColaboradorModel.create({ nome, especialidade, telefone, email, data_admissao, status, senha: hash });
      res.status(201).json({ mensagem: "Colaborador criado com sucesso!", colaborador });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Listar todos os colaboradores
  static async listarTodos(req, res) {
  try {
    const { especialidade } = req.query;

    const where = {};
    if (especialidade) {
      where.especialidade = especialidade;
    }
    if (!colaboradores || colaboradores.length === 0) {
      return res.status(200).json({ mensagem: "Nenhum colaborador encontrado!" });
    }
    res.status(200).json(colaboradores);
  } catch (error) {
    res.status(500).json({ mensagem: "Erro interno do servidor.", erro: error.message });
  }
}

  // Listar colaborador por ID
  static async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const colaborador = await ColaboradorModel.findByPk(id);
      if (!colaborador) {
        return res.status(404).json({ mensagem: "Colaborador não encontrado!" });
      }
      res.status(200).json(colaborador);
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Atualizar colaborador por ID
  static async atualizar(req, res) {
    try {
      const { nome, especialidade, telefone, email, data_admissao, status } = req.body;
      const { id } = req.params;
      const resultado = await ColaboradorModel.update(
        { nome, especialidade, telefone, email, data_admissao, status },
        { where: { id } }
      );
      if (!resultado || resultado[0] === 0) {
        return res.status(404).json({ mensagem: "Colaborador não encontrado!" });
      }
      res.status(200).json({ mensagem: "Colaborador atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Deletar colaborador por ID
  static async deletarPorId(req, res) {
    try {
      const { id } = req.params;
      const resultado = await ColaboradorModel.destroy({ where: { id } });
      if (!resultado) {
        return res.status(404).json({ mensagem: "Colaborador não encontrado!" });
      }
      res.status(200).json({ mensagem: "Colaborador excluído com sucesso!" });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Deletar todos os colaboradores
  static async deletarTodos(req, res) {
    try {
      await ColaboradorModel.destroy({ truncate: true });
      res.status(200).json({ mensagem: "Todos os colaboradores foram deletados!" });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Contar total de  colaboradores
  static async totalColaboradores(req, res) {
    try {
      const total = await ColaboradorModel.count();
      res.status(200).json({ total });
    } catch (error) {
      res.status(500).json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }
}

export default ColaboradorController;