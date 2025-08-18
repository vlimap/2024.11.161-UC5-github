import { DataTypes } from "sequelize";
import sequelize from "../../../config/database.js";

const ServicoModel = sequelize.define(
  "Servico",
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
        len: {
          args: [2, 100],
          msg: "O nome deve ter entre 2 e 100 caracteres.",
        },
        notEmpty: {
          msg: "O campo nome é obrigatório.",
        },
      },
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [10, 255],
          msg: "A descrição deve ter entre 10 e 255 caracteres.",
        },
      },
    },
    preco: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
      validate: {
        isDecimal: {
          msg: "O preço deve estar no formato decimal (ex: 39.90).",
        },
        min: {
          args: [0.01],
          msg: "O preço deve ser maior que zero.",
        },
      },
    },
    duracao: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: [1],
          msg: "A duração deve ser maior que zero.",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("ativo", "inativo"),
      allowNull: false,
      defaultValue: "ativo",
    },
  },
  {
    tableName: "servico",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

export default ServicoModel;