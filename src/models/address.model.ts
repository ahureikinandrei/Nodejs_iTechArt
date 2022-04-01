import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import sequelize from '../db';
import User from './user.model';

class Address extends Model<
    InferAttributes<Address>,
    InferCreationAttributes<Address>
> {
    declare id: CreationOptional<number>;

    declare name: string;

    declare country: string;

    declare city: string;

    declare userId: number;

    declare user?: NonAttribute<User>;
}

Address.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING },
        country: { type: DataTypes.STRING },
        city: { type: DataTypes.STRING },
        userId: { type: DataTypes.INTEGER.UNSIGNED },
    },
    {
        tableName: 'address',
        sequelize,
    }
);

export default Address;
