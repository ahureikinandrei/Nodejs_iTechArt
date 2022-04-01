import { Request, Response, NextFunction } from 'express';
import { createReadStream } from 'fs';
import ApiError from '../../error/ApiError';
import imageService from '../services/image.service';

class ImageController {
    async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            if (!req.files || !req.files.image) {
                next(ApiError.badRequest('No files were uploaded'));
                return;
            }

            if (Array.isArray(req.files.image)) {
                next(ApiError.badRequest('Need upload one file'));
                return;
            }

            const { image } = req.files;
            const imageName = await imageService.create(image);

            return res.json(imageName);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            const { imageName } = req.params;
            if (!imageName) {
                next(ApiError.notFound('Image not found'));
            }

            const imagePath = await imageService.get(imageName);
            const readStream = createReadStream(imagePath);

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
            const { imageName } = req.params;
            if (!imageName) {
                next(ApiError.notFound('Image not found'));
            }

            const message = await imageService.delete(imageName);
            res.json(message);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

export default new ImageController();
