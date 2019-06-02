import * as Sequelize from 'sequelize'
import { BaseModelInterface } from '../interface/BaseModelInterface';

export interface CarteiraAttributes {
    id?: number
    descricao?: string
    situacao?: boolean
    cel_original?: string
    limite_envio?: number
    iduser?: number //varios usuariois com acesso a ela
    createdAt?: string
    updatedAt?: string
}

export interface CarteiraInstance extends Sequelize.Instance<CarteiraAttributes>, CarteiraAttributes {}

export interface CarteiraModel extends BaseModelInterface, Sequelize.Model<CarteiraInstance, CarteiraAttributes> {}

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): CarteiraModel => {
    const Carteira: CarteiraModel = sequelize.define('Carteira', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        descricao: {
            type: DataTypes.STRING(128),
        },
        situacao: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        cel_original: {
            type: DataTypes.STRING(30),
            allowNull: false
        },
        limite_envio: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        iduser: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: 'carteira'
    })

    return Carteira
}