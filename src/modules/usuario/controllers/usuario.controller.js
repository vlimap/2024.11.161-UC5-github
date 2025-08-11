import bcrypt from "bcryptjs";
import UsuarioModel from "../models/usuario.model.js";

class UsuarioController {
  // Cadastrar usuário
  static async cadastrar(req, res) {
    try {
      const { nome, email, senha, foto_perfil } = req.body;
      if (!nome || !email || !senha) {
        return res
          .status(400)
          .json({ mensagem: "Nome, e-mail e senha são obrigatórios!" });
      }
      const salt = await bcrypt.genSaltSync(10);
      const hash = await bcrypt.hash(senha, salt);
      await UsuarioModel.create({ nome, email, senha: hash, foto_perfil });

      res.status(201).json({ mensagem: "Usuário criado com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Listar todos os usuários
  static async listarTodos(req, res) {
    try {
      const usuarios = await UsuarioModel.findAll({
        attributes: {
          exclude: ["senha"],
        },
      });
      if (!usuarios || usuarios.length === 0) {
        return res.status(200).json({ mensagem: "Banco de dados vazio!" });
      }
      res.status(200).json(usuarios);
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Listar usuário por ID
  static async listarPorId(req, res) {
    try {
      const { id } = req.params;
      const usuario = await UsuarioModel.findByPk(id);
      if (!usuario) {
        return res.status(404).json({ mensagem: "Usuário não encontrado!" });
      }
      res.status(200).json(usuario);
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Atualizar usuário por ID
  static async atualizar(req, res) {
    try {
      const { nome, email, senha, foto_perfil } = req.body;
      const { id } = req.params;
      const resultado = await UsuarioModel.update(
        { nome, email, senha, foto_perfil },
        { where: { id } }
      );
      if (!resultado) {
        return res.status(404).json({ mensagem: "Usuário não encontrado!" });
      }
      res.status(200).json({ mensagem: "Usuário atualizado com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Deletar usuário por ID
  static async deletarPorId(req, res) {
    try {
      const { id } = req.params;
      const resultado = await UsuarioModel.destroy({ where: { id } });
      if (!resultado) {
        return res.status(404).json({ mensagem: "Usuário não encontrado!" });
      }
      res.status(200).json({ mensagem: "Usuário excluído com sucesso!" });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Deletar todos os usuários
  static async deletarTodos(req, res) {
    try {
      await UsuarioModel.destroy({ truncate: true });
      res.status(200).json({ mensagem: "Todos os usuários foram deletados!" });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }

  // Contar total de usuários
  static async totalUsuarios(req, res) {
    try {
      const total = await UsuarioModel.count();
      res.status(200).json({ total });
    } catch (error) {
      res
        .status(500)
        .json({ mensagem: "Erro interno do servidor.", erro: error.message });
    }
  }
}

export default UsuarioController;
