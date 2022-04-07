import { Request, Response, NextFunction } from 'express';
import ApiError from '../../error/ApiError';
import {
    AddressModel,
    PersonalInfoModel,
    ProdModel,
    UserModel,
} from '../models';
import { IGetAllQueryParams, IUser } from './types/user.types';
import Prod from '../models/prods.models';
import User from '../models/user.model';
import userService from '../services/user.service';

class UserController {
    async create(
        req: Request<{}, IUser, IUser>,
        res: Response<IUser>,
        next: NextFunction
    ): Promise<void> {
        try {
            const { name, age, salary, country, city, langs, sizes } = req.body;

            const user = await UserModel.create({
                name,
                age,
                salary,
            });

            const address = await AddressModel.create({
                name,
                country,
                city,
                userId: user.id,
            });

            const personalInfo = await PersonalInfoModel.create({
                name,
                langs,
                sizes,
                userId: user.id,
            });

            const response = { ...user, ...address, ...personalInfo };

            res.json(response);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getAll(
        req: Request<{}, User[], {}, IGetAllQueryParams, {}>,
        res: Response<User[]>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { name, lang, min, max } = req.query;

            const users = await userService.findAllByParams(
                name,
                lang,
                min,
                max
            );

            res.json(users);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getOne(
        req: Request,
        res: Response<User | null>,
        next: NextFunction
    ): Promise<void> {
        try {
            const { id } = req.params;
            if (!id) {
                next(ApiError.badRequest('ID not found'));
            }

            const user = await userService.findOneByParams(id);

            res.json(user);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(
        req: Request,
        res: Response<number>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { id } = req.params;
            if (!id) {
                next(ApiError.badRequest('ID not found'));
            }

            const deletedUserCount = await UserModel.destroy({
                where: { id },
            });

            res.json(deletedUserCount);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async update(req: Request, res: Response<Prod[]>, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) {
                next(ApiError.badRequest('ID not found'));
            }

            const user = await UserModel.findOne({
                where: { id },
            });

            const prod = await ProdModel.findOne({
                where: { id: 3 },
            });

            if (!user || !prod) {
                next(ApiError.badRequest('User or prod not found'));
                return;
            }

            await user.addProd(prod);
            const userProds = await user.getProds();

            res.json(userProds);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

export default new UserController();
