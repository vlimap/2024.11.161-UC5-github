import ProdutoModel from "../models/produto.model.js";

/**
 * Controlador de Produtos/Serviços da Barbearia
 */
class ProdutoController {
  // Cadastrar novo produto ou serviço
  static async cadastrar(req, res) {
    try {
      const { nome, marca, preco, quantidade_estoque, descricao, tipo } = req.body;

      if (!nome || !preco || !descricao || !tipo) {
        return res.status(400).json({
          mensagem: "Campos obrigatórios: nome, preco, descricao e tipo.",
        });
      }

      const novoProduto = await ProdutoModel.create({
        nome,
        marca,
        preco,
        quantidade_estoque,
        descricao,
        tipo,
      });

      res.status(201).json({
        mensagem: "Produto/serviço cadastrado com sucesso!",
        produto: novoProduto,
      });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao cadastrar produto/serviço.",
        erro: error.message,
      });
    }
  }

  // Listar todos com filtro por tipo
  static async listarTodos(req, res) {
    try {
      const { tipo } = req.query;
      const where = tipo ? { tipo } : {};
      const produtos = await ProdutoModel.findAll({ where });

      if (produtos.length === 0) {
        return res.status(200).json({ mensagem: "Nenhum item encontrado." });
      }

      res.status(200).json(produtos);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao listar produtos/serviços.",
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
        return res.status(404).json({ mensagem: "Produto/serviço não encontrado." });
      }

      res.status(200).json(produto);
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao buscar produto/serviço.",
        erro: error.message,
      });
    }
  }

  // Atualizar produto/serviço
  static async atualizar(req, res) {
    try {
      const { nome, marca, preco, quantidade_estoque, descricao, tipo } = req.body;
      const id = req.params.id;

      const atualizado = await ProdutoModel.update(
        { nome, marca, preco, quantidade_estoque, descricao, tipo },
        { where: { id } }
      );

      if (atualizado[0] === 0) {
        return res.status(404).json({ mensagem: "Produto/serviço não encontrado para atualização." });
      }

      res.status(200).json({ mensagem: "Atualizado com sucesso!" });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao atualizar produto/serviço.",
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
        return res.status(404).json({ mensagem: "Produto/serviço não encontrado para exclusão." });
      }

      res.status(200).json({ mensagem: "Excluído com sucesso!" });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao excluir produto/serviço.",
        erro: error.message,
      });
    }
  }

  // Deletar todos
  static async deletarTodos(req, res) {
    try {
      await ProdutoModel.destroy({ truncate: true });
      res.status(200).json({ mensagem: "Todos os produtos/serviços foram excluídos!" });
    } catch (error) {
      res.status(500).json({
        mensagem: "Erro ao excluir todos os itens.",
        erro: error.message,
      });
    }
  }
}

export default ProdutoController;
