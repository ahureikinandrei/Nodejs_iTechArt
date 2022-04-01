import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import sequelize from '../db';

class Prod extends Model<InferAttributes<Prod>, InferCreationAttributes<Prod>> {
    declare id: CreationOptional<number>;

    declare name: string;

    declare cost: number;

    declare rest: number;
}

Prod.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING },
        cost: { type: DataTypes.INTEGER },
        rest: { type: DataTypes.INTEGER },
    },
    {
        tableName: 'prods',
        sequelize,
    }
);

export default Prod;
