import { Request, Response, NextFunction } from 'express';
import ApiError from '../../error/ApiError';
import { PersonalInfoModel } from '../models/index';

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
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const personalInfo = await PersonalInfoModel.findAll();
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
                include: [{ model: PersonalInfoModel, as: 'info' }],
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
