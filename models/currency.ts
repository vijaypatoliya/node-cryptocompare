import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../lib/db/index';

export interface ICurrency extends Model {
    id?: number;
    fromSymbol?: string;
    toSymbol?: string;
    raw?: string;
    display?: string;
}

export const Currency = sequelize.define<ICurrency>('currency', {
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    fromSymbol: {
        type: DataTypes.STRING,
    },
    toSymbol: {
        type: DataTypes.STRING,
    },
    raw: {
        type: DataTypes.JSON,
    },
    display: {
        type: DataTypes.JSON,
    },
})
Currency.sync({ alter: true })
