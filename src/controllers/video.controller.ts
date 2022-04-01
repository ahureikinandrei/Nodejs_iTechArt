import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { createReadStream } from 'fs';
import ApiError from '../../error/ApiError';
import videoService from '../services/video.service';

class VideoController {
    async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            if (!req.files || !req.files.file) {
                next(ApiError.badRequest('No files were uploaded'));
                return;
            }

            if (Array.isArray(req.files.file)) {
                next(ApiError.badRequest('Need upload one file'));
                return;
            }

            const { file } = req.files;
            const fileName = await videoService.create(file);
            return res.json(fileName);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { fileName } = req.params;

            if (!fileName) {
                next(ApiError.notFound('File not found'));
            }

            const pathToFile = path.join(
                __dirname,
                '..',
                '..',
                'static',
                fileName
            );
            const readStream = createReadStream(pathToFile);

            readStream.on('error', (e) => {
                next(ApiError.internal(e.message));
            });

            return readStream.pipe(res);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { fileName } = req.params;

            if (!fileName) {
                next(ApiError.notFound('File not found'));
            }
            const massage = await videoService.delete(fileName);
            return res.json(massage);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

export default new VideoController();
