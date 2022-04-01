import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import ApiError from '../../error/ApiError';

class FolderController {
    async create(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { name } = req.query;

            if (typeof name !== 'string') {
                next(ApiError.badRequest('Need choose folder name'));
                return;
            }

            fs.mkdir(path.join(__dirname, '..', name), (err) => {
                if (err) {
                    next(ApiError.internal(err.message));
                    return;
                }
                res.json('Folder has been created');
            });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async get(req: Request, res: Response, next: NextFunction) {
        try {
            fs.readdir(
                path.join(__dirname, '..'),
                { withFileTypes: true },
                (err, files) => {
                    if (err) {
                        next(ApiError.internal(err.message));
                        return;
                    }
                    const foldersNameArray = files
                        .filter((dirent) => dirent.isDirectory())
                        .map((dirent) => dirent.name);
                    res.json(foldersNameArray);
                }
            );
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { name } = req.query;

            if (typeof name !== 'string') {
                next(ApiError.badRequest('Need choose folder name'));
                return;
            }

            fs.rmdir(path.join(__dirname, '..', name), (err) => {
                if (err) {
                    next(ApiError.badRequest(err.message));
                    return;
                }
                res.json('Folder has been deleted');
            });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

export default new FolderController();
