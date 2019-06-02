import * as Sequelize from 'sequelize'
import { BaseModelInterface } from '../interface/BaseModelInterface';

export interface PagSeguroAttributes {
    id?: number
    id_pagseguro?: number
    createdAt?: string
    updatedAt?: string
}


export interface PagSeguroInstance extends Sequelize.Instance<PagSeguroAttributes> { }

export interface PagSeguroModel extends BaseModelInterface, Sequelize.Model<PagSeguroInstance, PagSeguroModel> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): PagSeguroModel => {

    const PagSeguro: PagSeguroModel = sequelize.define('PagSeguro', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        id_pagseguro: {
            type: DataTypes.STRING(255)
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        }

    },{
        tableName: 'PagSeguro'
    })

    return PagSeguro

}
