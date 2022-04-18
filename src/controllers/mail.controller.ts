import { NextFunction, Request, Response } from 'express';
import ApiError from '../../error/ApiError';
import mailService from '../services/mail.service';

class MailController {
    async send(req: Request, res: Response, next: NextFunction) {
        try {
            const mailStatus = await mailService.send();
            res.json(mailStatus);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

export default new MailController();
