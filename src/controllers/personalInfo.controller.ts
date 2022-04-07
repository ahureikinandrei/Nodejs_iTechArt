import { Request, Response, NextFunction } from 'express';
import { Op } from 'sequelize';
import ApiError from '../../error/ApiError';
import { PersonalInfoModel } from '../models';
import {
    IPersonalInfo,
    IFindParams,
    IGetQuery,
} from './types/personalInfo.types';

class PersonalInfoController {
    async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> {
        try {
            const personalInfo = await PersonalInfoModel.create({
                name: 'John',
                langs: ['english', 'spanish'],
                sizes: [1, 2, 3],
                userId: 1,
            });

            res.json(personalInfo);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getAll(
        req: Request<{}, IPersonalInfo[], {}, IGetQuery>,
        res: Response<IPersonalInfo[]>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { langs, first, strict, min, max } = req.query;

            const findParams: IFindParams = {
                where: {},
            };

            if (Array.isArray(langs)) {
                const operation = strict === 'true' ? Op.contains : Op.overlap;
                findParams.where.langs = { [operation]: langs };
            }

            if (typeof langs === 'string') {
                findParams.where.langs = { [Op.contains]: [langs] };
            }

            if (min || max) {
                findParams.where.sizes = { [Op.overlap]: [min, max] };
            }

            const personalInfo = await PersonalInfoModel.findAll(findParams);

            if (first === 'true') {
                const personalInfoFiltered = personalInfo.filter((info) => {
                    const mainLang = info.langs ? info.langs[0] : '';
                    return mainLang === langs;
                });
                res.json(personalInfoFiltered);
                return;
            }
            res.json(personalInfo);
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

            const personalInfo = await PersonalInfoModel.findOne({
                where: { id },
            });
            res.json(personalInfo);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            res.json('delete');
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

export default new PersonalInfoController();
