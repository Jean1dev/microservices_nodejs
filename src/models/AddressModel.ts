import * as Sequelize from 'sequelize'
import { BaseModelInterface } from '../interface/BaseModelInterface';

export interface AddressAttributes {
    id?: number
    street?: string
    number?: number
    createdAt?: string
    updatedAt?: string
}


export interface AddressInstance extends Sequelize.Instance<AddressAttributes> { }

export interface AddressModel extends BaseModelInterface, Sequelize.Model<AddressInstance, AddressAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): AddressModel => {

    const Addres: AddressModel = sequelize.define('Address', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        street: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        number: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
            tableName: 'Address'
        })

    return Addres
}
