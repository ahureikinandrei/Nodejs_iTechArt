import {
    CreationOptional,
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import sequelize from '../db';

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
