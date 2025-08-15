import { DataTypes } from "sequelize";
import sequelize from "../../../../config/database.js";

const EstoqueModel = sequelize.define(
  "Estoque",
  //produto_id, quantidade, localizacao, data_entrada, data_saida
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    produto_id:  {
      type: DataTypes.UUID,
      allowNull: false,
      unique: true,
      references: {
        model: "produto",
        key: "id"
      }
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
        validate: {
            isInt: {
                msg: "A quantidade deve ser um número inteiro!"
            },
            min: {
                args: 0,
                msg: "A quantidade não pode ser negativa!"
            }
        },
    },
    localizacao: {
      type: DataTypes.STRING,
      allowNull: false,
        validate: {
            notEmpty: {
                msg: "A localização não pode estar vazia!"
            },
            len: {
                args: [1, 255],
                msg: "A localização deve ter entre 1 e 255 caracteres!"
            }
        },
    },
    data_entrada: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW(),
        validate: {
            isDate: {
                msg: "A data de entrada deve ser uma data válida!"
            },
            notNull: {
                msg: "A data de entrada é obrigatória!"
            }
        },
    },
    data_saida: {
        type: DataTypes.DATE,
        defaultValue: null,
        allowNull: true,
        validate: {
            isDate: {
                msg: "A data de saída deve ser uma data válida!"
            },
            isMaiorQueDataEntrada(value) {
                if (value && this.data_entrada && new Date(value) < new Date(this.data_entrada)) {
                    throw new Error('A data de saída não pode ser anterior à data de entrada!');
                }
            }
        },
    }
  },

  {
    tableName: "estoque",
    createdAt: "criado_em",
    updatedAt: "atualizado_em"
  }
);

export default EstoqueModel;
