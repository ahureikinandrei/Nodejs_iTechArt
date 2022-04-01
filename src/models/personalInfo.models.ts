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

class PersonalInfoModel extends Model<
    InferAttributes<PersonalInfoModel>,
    InferCreationAttributes<PersonalInfoModel>
> {
    declare id: CreationOptional<number>;

    declare name: string;

    declare langs?: string[] | null;

    declare sizes: number[] | null;

    declare createdAt: CreationOptional<Date>;

    declare updatedAt: CreationOptional<Date>;

    declare userId: number;

    declare user?: NonAttribute<User>;
}

PersonalInfoModel.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING },
        langs: { type: DataTypes.ARRAY(DataTypes.STRING) },
        sizes: { type: DataTypes.ARRAY(DataTypes.INTEGER) },
        userId: { type: DataTypes.INTEGER.UNSIGNED },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'personalInfo',
        sequelize,
    }
);

export default PersonalInfoModel;
