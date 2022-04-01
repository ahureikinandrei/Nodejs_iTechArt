import { Request, Response, NextFunction } from 'express';
import ApiError from '../../error/ApiError';
import {
    AddressModel,
    PersonalInfoModel,
    ProdModel,
    UserModel,
} from '../models/index';
import { IUser } from './types/user.types';

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
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const users = await UserModel.findAll();
            res.json(users);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getOne(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { id } = req.params;
            if (!id) {
                next(ApiError.badRequest('ID not found'));
            }

            const user = await UserModel.findOne({
                where: { id },
                include: [
                    { model: PersonalInfoModel, as: 'info' },
                    { model: AddressModel, as: 'address' },
                    { model: ProdModel, as: 'prods' },
                ],
            });

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

    async update(req: Request, res: Response<number>, next: NextFunction) {
        try {
            const { id } = req.params;
            if (!id) {
                next(ApiError.badRequest('ID not found'));
            }

            const user = await UserModel.findOne({
                where: { id },
            });

            const prod = await ProdModel.findOne({
                where: { id: 1 },
            });

            if (!user || !prod) {
                next(ApiError.badRequest('user or prod not found'));
                return;
            }

            const inf = await user.addProd(prod);
            console.log(inf);

            res.json(123);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

export default new UserController();
