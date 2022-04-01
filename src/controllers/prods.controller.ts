import { Request, Response, NextFunction } from 'express';
import ApiError from '../../error/ApiError';
import { IProd } from './types/prod.types';
import { ProdModel } from '../models/index';

class ProdController {
    async create(
        req: Request<{}, IProd, IProd>,
        res: Response<IProd>,
        next: NextFunction
    ): Promise<void> {
        try {
            const { name, cost, rest } = req.body;
            const prod = await ProdModel.create({ name, cost, rest });

            res.json(prod);
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
            const users = await ProdModel.findAll();
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

            const user = await ProdModel.findOne({
                where: { id },
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

            const deletedUserCount = await ProdModel.destroy({
                where: { id },
            });

            res.json(deletedUserCount);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

export default new ProdController();
