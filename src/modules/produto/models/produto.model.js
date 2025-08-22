import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js"; // da pasta produto/models
import EstoqueModel from "../../estoque/models/estoque.model.js"; // ✅ Importa o model de estoque

const ProdutosModel = sequelize.define(
  "produto",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    nome: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100],
        notEmpty: true,
      },
    },
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [2, 100],
        notEmpty: true,
      },
    },
    preco: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0.01,
      },
    },
    quantidade_estoque: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [20, 255],
        notEmpty: true,
      },
    },
    categoria: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    imagem_url: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    ativo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    tableName: "produto",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

// Relacionamento: Produto tem várias movimentações de estoque
ProdutosModel.hasMany(EstoqueModel, {
  foreignKey: "produto_id",
  as: "movimentacoes",
});

EstoqueModel.belongsTo(ProdutosModel, {
  foreignKey: "produto_id",
  as: "produto",
});

export default ProdutosModel;
