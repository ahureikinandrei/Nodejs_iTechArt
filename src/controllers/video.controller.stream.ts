import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs, { createReadStream } from 'fs';
import * as uuid from 'uuid';
import ApiError from '../../error/ApiError';
import videoService from '../services/video.service';

class VideoController {
    async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const fileName = `${uuid.v4()}.mp4`;
            const pathToFile = path.join(
                __dirname,
                '..',
                '..',
                'static',
                'video',
                fileName
            );
            const stream = fs.createWriteStream(pathToFile);
            stream.on('open', () => {
                req.pipe(stream);
            });

            stream.on('data', (chunk) => {
                console.log(chunk);
            });

            stream.on('close', () => {
                return res.json(fileName);
            });
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
