import ProdutoModel from "../models/produto.model.js";

/**
 * Controlador de Produtos/Serviços da Barbearia
 */
class ProdutoController {
  // Cadastrar novo serviço/produto
  static async cadastrar(req, res) {
    try {
      const { nome, preco, descricao } = req.body;
      if (!nome || !preco || !descricao) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios para cadastrar um serviço/produto da barbearia." });
      }
      await ProdutoModel.create({ nome, preco, descricao });
      res.status(201).json({ mensagem: "Serviço/produto cadastrado com sucesso!" });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro interno do servidor ao cadastrar serviço/produto.",
        erro: error.message,
      });
    }
  }

  // Listar todos
  static async listarTodos(req, res) {
    try {
      const produtos = await ProdutoModel.findAll();
      if (produtos.length === 0) {
        return res.status(200).json({ mensagem: "Nenhum serviço ou produto encontrado na barbearia." });
      }
      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro interno do servidor ao listar serviços/produtos.",
        erro: error.message,
      });
    }
  }

  // Listar por ID
  static async listarPorId(req, res) {
    try {
      const id = req.params.id;
      const produto = await ProdutoModel.findByPk(id);
      if (!produto) {
        return res.status(404).json({ mensagem: "Serviço/produto da barbearia não encontrado!" });
      }
      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro interno do servidor ao buscar o serviço/produto.",
        erro: error.message,
      });
    }
  }

  // Atualizar
  static async atualizar(req, res) {
    try {
      const { nome, preco, descricao } = req.body;
      const id = req.params.id;

      const atualizado = await ProdutoModel.update(
        { nome, preco, descricao },
        { where: { id } }
      );

      if (atualizado[0] === 0) {
        return res.status(404).json({ mensagem: "Serviço/produto não encontrado para atualização!" });
      }

      res.status(200).json({ mensagem: "Serviço/produto atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro interno ao atualizar serviço/produto da barbearia.",
        erro: error.message,
      });
    }
  }

  // Deletar por ID
  static async deletarPorId(req, res) {
    try {
      const id = req.params.id;
      const deletado = await ProdutoModel.destroy({ where: { id } });

      if (!deletado) {
        return res.status(404).json({ mensagem: "Serviço/produto da barbearia não encontrado para exclusão." });
      }

      res.status(200).json({ mensagem: "Serviço/produto excluído com sucesso!" });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro interno ao excluir serviço/produto.",
        erro: error.message,
      });
    }
  }

  // Deletar todos
  static async deletarTodos(req, res) {
    try {
      await ProdutoModel.destroy({ truncate: true });
      res.status(200).json({ mensagem: "Todos os serviços/produtos da barbearia foram excluídos!" });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro interno ao excluir todos os serviços/produtos.",
        erro: error.message,
      });
    }
  }
}

export default ProdutoController;
