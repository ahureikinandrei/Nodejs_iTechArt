import { Request, Response, NextFunction } from 'express';
import sequelize, { Op } from 'sequelize';
import ApiError from '../../error/ApiError';
import {
    IFindParams,
    IGetProdsRes,
    IGetQuery,
    IProd,
    IUpdateProdsBody,
    IUpdateProdsResponse,
    IUpdateQuery,
} from './types/prod.types';
import { ProdModel } from '../models';
import Prod from '../models/prods.models';

class ProdController {
    async create(
        req: Request<{}, IProd | IProd[], IProd>,
        res: Response<IProd | IProd[]>,
        next: NextFunction
    ): Promise<void> {
        try {
            if (Array.isArray(req.body)) {
                const arrayPromisesCreatingProds = req.body.map((prod) => {
                    const { name, cost, rest } = prod;
                    return ProdModel.create({ name, cost, rest });
                });

                const prods = await Promise.all(arrayPromisesCreatingProds);
                res.json(prods);
                return;
            }

            const { name, cost, rest } = req.body;
            const prod = await ProdModel.create({ name, cost, rest });

            res.json(prod);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getAll(
        req: Request<{}, IGetProdsRes, {}, IGetQuery>,
        res: Response<IGetProdsRes>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { cost, rest, limit, oneOfCost, minCost, maxCost } =
                req.query;
            const findParams: IFindParams = {
                where: {},
                order: sequelize.col('cost'),
            };

            if (limit) {
                findParams.limit = parseInt(limit, 10);
            }

            if (cost) {
                findParams.where.cost = cost;
            }

            if (rest) {
                findParams.where.rest = rest;
            }

            if (oneOfCost) {
                findParams.where.cost = oneOfCost;
            }

            if (minCost) {
                findParams.where = {
                    cost: { [Op.gte]: minCost },
                };
            }

            if (maxCost) {
                findParams.where = {
                    cost: { [Op.lte]: maxCost },
                };
            }

            findParams.attributes = { include: [], exclude: ['id'] };
            const users = await ProdModel.findAndCountAll<Prod>(findParams);

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

    async deleteMany(
        req: Request<{}, number, IProd>,
        res: Response<number>,
        next: NextFunction
    ) {
        try {
            const deletedUserCount = await ProdModel.destroy({
                where: { ...req.body },
            });

            res.json(deletedUserCount);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getAllCosts(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response<number[]> | void> {
        try {
            const prodsWhitOnlyCostField = await ProdModel.findAll<Prod>({
                attributes: [
                    [sequelize.fn('DISTINCT', sequelize.col('cost')), 'cost'],
                ],
                raw: true,
            });

            const costArray = prodsWhitOnlyCostField.map(({ cost }) => cost);
            return res.json(costArray);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async update(
        req: Request<{}, IUpdateProdsResponse, IUpdateProdsBody, IUpdateQuery>,
        res: Response<IUpdateProdsResponse>,
        next: NextFunction
    ) {
        try {
            const { updateAll } = req.query;
            const { cost, newCost } = req.body;

            if (updateAll === 'true') {
                const updatedProdsCountArray = await ProdModel.update(
                    {
                        cost: newCost,
                    },
                    {
                        where: {
                            cost,
                        },
                    }
                );

                const [updatedProdsCount] = updatedProdsCountArray;
                return res.json({
                    data: updatedProdsCount,
                    message: 'Prods has been updated',
                });
            }

            const prod = await ProdModel.findOne<Prod>({
                where: {
                    cost,
                },
            });

            if (!prod) {
                next(ApiError.badRequest('Prod not found'));
                return;
            }
            prod.cost = newCost;
            await prod.save();

            return res.json({
                data: 1,
                message: 'Prod has been updated',
            });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

export default new ProdController();
