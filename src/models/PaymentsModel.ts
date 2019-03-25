import * as Sequelize from 'sequelize'
import { BaseModelInterface } from '../interface/BaseModelInterface';
import { ModelsInterface } from '../interface/ModelsInterface';

export interface PaymentAttributes {
    id?: number
    date?: Date
    cost?: number
    document?: string
    description?: string
    iduser?: string
    createdAt?: string
    updatedAt?: string
}


export interface PaymentInstance extends Sequelize.Instance<PaymentAttributes> { }

export interface PaymentModel extends BaseModelInterface, Sequelize.Model<PaymentInstance, PaymentAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): PaymentModel => {

    const Payment: PaymentModel = sequelize.define('Payment', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: Sequelize.NOW
        },
        cost: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        document: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: false
        }

    }, {
            tableName: 'payments'
        })

    Payment.associate = (models: ModelsInterface): void => {
        Payment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'iduser',
                name: 'iduser'
            }
        })
    }

    return Payment
}
