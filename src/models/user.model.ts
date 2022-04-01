import {
    Association,
    CreationOptional,
    DataTypes,
    HasManyAddAssociationMixin,
    InferAttributes,
    InferCreationAttributes,
    Model,
    NonAttribute,
} from 'sequelize';
import sequelize from '../db';
import PersonalInfoModel from './personalInfo.models';
import Address from './address.model';
import Prod from './prods.models';

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    declare id: CreationOptional<number>;

    declare name: string;

    declare age: number;

    declare salary: number;

    declare createdAt: CreationOptional<Date>;

    declare updatedAt: CreationOptional<Date>;

    declare info?: NonAttribute<PersonalInfoModel>;

    declare address?: NonAttribute<Address>;

    declare prods?: NonAttribute<Prod[]>;

    declare addProd: HasManyAddAssociationMixin<Prod, number>;

    declare static associations: {
        info: Association<User, PersonalInfoModel>;
        address: Association<User, Address>;
        prods: Association<User, Prod>;
    };
}

User.init(
    {
        id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
        name: { type: DataTypes.STRING },
        age: { type: DataTypes.INTEGER },
        salary: { type: DataTypes.INTEGER },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    },
    {
        tableName: 'users',
        sequelize,
    }
);

User.hasOne(PersonalInfoModel, { as: 'info', foreignKey: 'userId' });
PersonalInfoModel.belongsTo(User);

User.hasOne(Address, { as: 'address', foreignKey: 'userId' });
Address.belongsTo(User);

User.belongsToMany(Prod, { through: 'UserProd', as: 'prods' });
Prod.belongsToMany(User, { through: 'UserProd', as: 'users' });

export default User;
