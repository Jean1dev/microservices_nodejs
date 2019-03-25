import * as Sequelize from 'sequelize'
import { BaseModelInterface } from '../interface/BaseModelInterface';
import { ModelsInterface } from '../interface/ModelsInterface';

export interface ComplaintsAttributes {
    id?: number
    description?: string
    cause?: string
    author?: number
    accused?: number
    createdAt?: string
    updatedAt?: string
}


export interface ComplaintsInstance extends Sequelize.Instance<ComplaintsAttributes> { }

export interface ComplainstModel extends BaseModelInterface, Sequelize.Model<ComplaintsInstance, ComplaintsAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): ComplainstModel => {

    const Complaints: ComplainstModel = sequelize.define('Complaints', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        cause: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
        tableName: 'complaints'
    })

    Complaints.associate = (models: ModelsInterface):void => {
        Complaints.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'author',
                name: 'author'
            }
        })
    }

    return Complaints
}