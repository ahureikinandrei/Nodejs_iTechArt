import { Op } from 'sequelize';
import {
    AddressModel,
    PersonalInfoModel,
    ProdModel,
    UserModel,
} from '../models';
import User from '../models/user.model';
import { IFindParams, IUserIncludes } from '../controllers/types/user.types';

class UserService {
    async findAllByParams(
        name?: string,
        lang?: string,
        min?: string,
        max?: string
    ): Promise<User[]> {
        const findParams: IFindParams = {};
        const personalInfoInclude: IUserIncludes = {
            model: PersonalInfoModel,
            as: 'info',
            where: {},
        };

        const addressInfoInclude: IUserIncludes = {
            model: AddressModel,
            as: 'address',
        };

        const prodsInclude: IUserIncludes = {
            model: ProdModel,
            as: 'prods',
        };

        if (name) {
            findParams.name = name;
        }

        if (lang) {
            personalInfoInclude.where.langs = {
                [Op.contains]: [lang],
            };
        }

        if (min || max) {
            personalInfoInclude.where.sizes = {
                [Op.overlap]: [min, max],
            };
        }

        const users = await UserModel.findAll({
            where: findParams,
            include: [personalInfoInclude, addressInfoInclude, prodsInclude],
        });

        return users;
    }

    async findOneByParams(id: string): Promise<User | null> {
        const user = await UserModel.findOne({
            where: { id },
            include: [
                { model: PersonalInfoModel, as: 'info' },
                { model: AddressModel, as: 'address' },
                { model: ProdModel, as: 'prods' },
            ],
        });
        return user;
    }
}

export default new UserService();
