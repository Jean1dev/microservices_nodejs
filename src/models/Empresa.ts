import * as Sequelize from 'sequelize'
import { BaseModelInterface } from '../interface/BaseModelInterface';

export interface EmpresaAttributes{

    id?: number
    name?: string
    cnpj?: string
    tipoContrato?: number
    createdAt?: string
    updatedAt?: string
}


export interface EmpresaInstance extends Sequelize.Instance<EmpresaAttributes> { }

export interface EmpresaModel extends BaseModelInterface, Sequelize.Model<EmpresaInstance, EmpresaAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): EmpresaModel => {

    const empresa: EmpresaModel = sequelize.define('Empresa', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        cnpj: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        tipoContrato: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
            tableName: 'Empresa'
        })

    return empresa
}