import * as Sequelize from 'sequelize'
import { BaseModelInterface } from '../interface/BaseModelInterface';
import { ModelsInterface } from '../interface/ModelsInterface';

export interface ServiceAttributes {
    id?: number
    detail?: string
    date?: Date
    passedTime?: string
    rating?: number
    idschedule?: number
    iduser?: number
    idpayment?: number
    createdAt?: string
    updatedAt?: string
}


export interface ServiceInstance extends Sequelize.Instance<ServiceAttributes> { }

export interface ServiceModel extends BaseModelInterface, Sequelize.Model<ServiceInstance, ServiceAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): ServiceModel => {

    const Service: ServiceModel = sequelize.define('Service', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        detail: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        passedTime: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        rating: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0.00
        }
    }, {
            tableName: 'services'
        })

    Service.associate = (models: ModelsInterface): void => {

        Service.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field:'iduser',
                name: 'iduser'
            }
        }) 

        Service.belongsTo(models.Schedule, {
            foreignKey: {
                allowNull: false,
                field: 'idschedule',
                name: 'idschedule'
            }
        })

        Service.belongsTo(models.Payment, {
            foreignKey: {
                allowNull: false,
                field: 'idpayment',
                name: 'idpayment'
            }
        })
    }

    return Service
}