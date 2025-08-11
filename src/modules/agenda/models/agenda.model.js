import { DataTypes } from 'sequelize';
import { sequelize } from '../../../config/database.js';

const AgendaModel = sequelize.define(
    "Agenda",
    {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        data:{
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        hora:{
            type: DataTypes.TIME,
            allowNull: false,
        },
        cliente_id:{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Clientes',
                key: 'id'
            }
        },
        colaborador_id:{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Colaboradores',
                key: 'id'
            }
        },
        servico_id:{
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Servicos',
                key: 'id'
            }
        },
        status:{
            type: DataTypes.ENUM('agendado', 'confirmado', 'cancelado'),
            allowNull: false
        }
    },
    {
        tableName: 'Agenda',
        createdAt: 'criado_em',
        updatedAt: 'atualizado_em'
    }
)

export default AgendaModel;