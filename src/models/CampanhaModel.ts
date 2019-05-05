import * as Sequelize from 'sequelize'
import { BaseModelInterface } from '../interface/BaseModelInterface';
import { ModelsInterface } from '../interface/ModelsInterface';

export interface CampanhaAttributes {
    id?: number
    hr_inicio?: string
    dt_inicio?: string
    total_contatos?: number
    total_descarte?: number
    mensagem?: string
    ativo?: boolean
    mailing?: string
    iduser?: number //fk
    idcarteira?: number //fk
    createdAt?: string
    updatedAt?: string
}

export interface CampanhaInstance extends Sequelize.Instance<CampanhaAttributes> { }

export interface CampanhaModel extends BaseModelInterface, Sequelize.Model<CampanhaInstance, CampanhaAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): CampanhaModel => {

    const Campanha: CampanhaModel = sequelize.define(`Campanha`, {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        hr_inicio: {
            type: DataTypes.TIME,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        dt_inicio: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        total_contatos: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        total_descarte: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        mensagem: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        mailing: {
            type: DataTypes.BLOB({ length: 'long' }),
            allowNull: false,
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        idcarteira: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    }, {
            tableName: `campanha`
        })

    Campanha.associate = (models: ModelsInterface): void => {
        Campanha.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'iduser',
                name: 'iduser'
            }
        })
        Campanha.hasOne(models.Carteira, { foreignKey: 'idcarteira'})
    }
    return Campanha
}