import * as Sequelize from 'sequelize'
import { BaseModelInterface } from '../interface/BaseModelInterface';

export interface CityAttributes {
    id?: number
    name?: string
    createdAt?: string
    updatedAt?: string
}


export interface CityInstance extends Sequelize.Instance<CityAttributes> { }

export interface CityModel extends BaseModelInterface, Sequelize.Model<CityInstance, CityAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): CityModel => {

    const City: CityModel = sequelize.define('City', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        }
    }, {
            tableName: 'City'
        })

    return City
}
