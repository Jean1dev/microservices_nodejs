import * as Sequelize from 'sequelize'
import { BaseModelInterface } from '../interface/BaseModelInterface';
import { ModelsInterface } from '../interface/ModelsInterface';

export interface ScheduleAttributes {
    id?: number
    date?: Date
    price?: number
    dayTurn?: string
    frequencyWeek?: number
    description?: string
    accepted?: boolean
    iduser?: number
    author?: number
    createdAt?: string
    updatedAt?: string
}


export interface ScheduleInstance extends Sequelize.Instance<ScheduleAttributes> { }

export interface ScheduleModel extends BaseModelInterface, Sequelize.Model<ScheduleInstance, ScheduleAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): ScheduleModel => {

    const Schedule: ScheduleModel = sequelize.define('Schedule', {
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
        price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        dayTurn: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        frequencyWeek: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        accepted: {
            type: DataTypes.ENUM,
            values: ['aceito', 'recuso', 'pendente'],
        },
        author: {
            type: DataTypes.INTEGER,
            allowNull: false
        },  
        description: {
            type: DataTypes.STRING(255),
            allowNull: false
        }
    }, {
            tableName: 'schedules'
        })

    Schedule.associate = (models: ModelsInterface): void => {
        Schedule.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                field: 'iduser',
                name: 'iduser'
            }
        })
    }

    return Schedule
}