import { DataTypes } from 'sequelize';
import  sequelize  from '../../../config/database.js';

const ClienteModel = sequelize.define(
    'clientes', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        telefone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        data_nascimento: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: true,
        }
    },

    {
        tableName: 'clientes',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em',
        deletedAt: 'deletado_em'
    }
);

export default ClienteModel;