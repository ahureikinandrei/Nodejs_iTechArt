import * as uuid from 'uuid';
import { access } from 'fs/promises';
import fs, { constants } from 'fs';
import path from 'path';
import fileUpload from 'express-fileupload';

class ImageService {
    async create(image: fileUpload.UploadedFile): Promise<string> {
        const [, format] = image.mimetype.split('/');

        const imageName = `${uuid.v4()}.${format}`;

        await image.mv(
            path.join(__dirname, '..', '..', 'static', 'images', imageName)
        );
        return imageName;
    }

    async get(fileName: string): Promise<string> {
        const pathToFile = path.join(
            __dirname,
            '..',
            '..',
            'static',
            'images',
            fileName
        );
        await access(pathToFile, constants.F_OK);
        return pathToFile;
    }

    async delete(imageName: string) {
        const pathToFile = path.join(
            __dirname,
            '..',
            '..',
            'static',
            'images',
            imageName
        );

        return new Promise<string>((resolve, reject) => {
            fs.rm(pathToFile, (err) => {
                if (err) {
                    reject(err.message);
                }
                resolve('Image has been removed');
            });
        });
    }
}

export default new ImageService();
