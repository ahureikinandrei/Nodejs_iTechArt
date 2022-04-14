import { Request, Response, NextFunction } from 'express';
import path from 'path';
import { createReadStream } from 'fs';
import ApiError from '../../error/ApiError';
import fileService from '../services/file.service';
import fileSystemWhitDb from '../services/fileSystemWhitDb.service';

class FileSystemWhitDbController {
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
            const fileName = await fileService.create(file);
            const fileModelInstance = await fileSystemWhitDb.createFileInDb(
                file.name,
                fileName
            );
            return res.json(fileModelInstance);
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

            const file = await fileSystemWhitDb.findFiles(fileName);
            if (!file) {
                next(ApiError.notFound('File not found'));
                return;
            }

            const pathToFile = path.join(
                __dirname,
                '..',
                '..',
                'static',
                file.nameFileOnServer
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
            const massage = await fileService.delete(fileName);
            return res.json(massage);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async saveInDb(req: Request, res: Response, next: NextFunction) {
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

            const fileInstanceModel = await fileSystemWhitDb.saveFileInDb(file);

            return res.json(fileInstanceModel.id);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async getImageFromDb(req: Request, res: Response, next: NextFunction) {
        const { id } = req.params;
        if (!id) {
            next(ApiError.badRequest('Id not found'));
            return;
        }

        const fileInstanceModel = await fileSystemWhitDb.getFileFromDb(id);
        if (!fileInstanceModel) {
            next(ApiError.badRequest('File not found'));
            return;
        }

        const bin = fileInstanceModel.encodeString;
        const str = bin.toString();
        const img = Buffer.from(str, 'base64');
        res.end(img);
    }
}

export default new FileSystemWhitDbController();
