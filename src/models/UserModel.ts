import { ModelsInterface } from './../interface/ModelsInterface';
import * as Sequelize from 'sequelize'
import { genSaltSync, hashSync, compareSync } from 'bcryptjs'
import { BaseModelInterface } from '../interface/BaseModelInterface';

export interface UserAttributes {
    id?: number
    name?: string
    email?: string
    password?: string
    contact_1?: string
    contact_2?: string
    description?: string
    rating?: number
    photo?: string
    operador?: boolean
    cpf?: number
    cdempresa?: number
    createdAt?: string
    updatedAt?: string
}

export interface UserInstance extends Sequelize.Instance<UserAttributes>, UserAttributes {
    isPassword(encodedPassword: string, password: string): boolean
}

export interface UserModel extends BaseModelInterface, Sequelize.Model<UserInstance, UserAttributes> { }

export default (sequelize: Sequelize.Sequelize, DataTypes: Sequelize.DataTypes): UserModel => {
    const User: UserModel = sequelize.define('User', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        description: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        name: {
            type: DataTypes.STRING(128),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(128),
            allowNull: false,
            unique: true
        },
        cpf: {
            type: DataTypes.NUMERIC,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING(128),
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        contact_1: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        contact_2: {
            type: DataTypes.STRING(128),
            allowNull: true
        },
        rating: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0.00
        },
        operador: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        photo: {
            type: DataTypes.BLOB({
                length: 'long'
            }),
            allowNull: true,
            defaultValue: null
        },
        cdempresa: {
            type: DataTypes.DECIMAL,
            allowNull: false,
            defaultValue: 0
        }
    }, {
            tableName: 'users',
            hooks: { // FAMOSAS TRIGGER DO STOPCELSO
                beforeCreate: (user: UserInstance, option: Sequelize.CreateOptions): void => {
                    const salt = genSaltSync()
                    user.password = hashSync(user.password, salt)
                },
                beforeUpdate: (user: UserInstance, option: Sequelize.CreateOptions): void => {
                    if (user.changed('password')) {
                        const salt = genSaltSync()
                        user.password = hashSync(user.password, salt)
                    }
                }
            }
        })

    User.associate = (models: ModelsInterface): void => {
        User.hasOne(models.Empresa, { as: 'user', foreignKey: 'cdempresa' })
    }
    /* User.associate = (models: ModelsInterface): void => {
         User.hasMany(models.Service, { as: 'user', foreignKey: 'iduser'})
         User.hasMany(models.Post)
         User.hasMany(models.Payment)
         User.hasMany(models.Complaints)
         User.hasMany(models.Schedule)
     }*/

    User.prototype.isPassword = (encodedPassword: string, password: string): boolean => {
        return compareSync(password, encodedPassword)
    }

    return User
}