import { DataTypes } from "sequelize";
import { sequelize } from "../../../config/database.js";

const ColaboradorModel = sequelize.define(
  "Colaborador",
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
          msg: "O nome deve ter entre 2 e 100 caracteres!",
        },
        notEmpty: {
          msg: "O campo nome deve ser preenchido!",
        },
        is: {
          args: /^[A-Za-zÀ-ÖØ-öø-ÿ0-9\s]+$/,
          msg: "O nome não deve conter caracteres especiais!",
        },
      },
    },
    especialidade: {
      type: DataTypes.ENUM("Barbeiro", "Recepcionista", "Administrador"),
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "A especialidade deve ser descrita.",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: "Este e-mail já está cadastrado!",
      },
      validate: {
        notEmpty: {
          msg: "O campo e-mail deve ser preenchido!",
        },
        isEmail: {
          msg: "O e-mail deve ser válido!",
        },
      },
    },
    telefone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "O telefone deve ser preenchido!",
        },
        is: {
          args: /^\(?\d{2}\)?[\s-]?(\d{4,5}-?\d{4})$/,
          msg: "O telefone deve ser válido! Ex: (84) 98765-1234",
        },
      },
    },
    data_admissao: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isDate: {
          msg: "Insira uma data de admissão válida!",
        },
      },
    },
    status: {
      type: DataTypes.ENUM("ativo", "inativo", "ferias", "desligado"),
      defaultValue: "ativo",
    },
  },
  {
    tableName: "colaborador",
    createdAt: "criado_em",
    updatedAt: "atualizado_em",
  }
);

export default ColaboradorModel;
