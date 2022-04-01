import * as uuid from 'uuid';
import path from 'path';
import fileUpload from 'express-fileupload';
import fs from 'fs';

class FileService {
    async create(file: fileUpload.UploadedFile): Promise<string> {
        const [, format] = file.name.split('.');

        const fileName = `${uuid.v4()}.${format}`;

        await file.mv(path.join(__dirname, '..', '..', 'static', fileName));
        return fileName;
    }

    async delete(fileName: string) {
        const pathToFile = path.join(__dirname, '..', '..', 'static', fileName);

        return new Promise<string>((resolve, reject) => {
            fs.rm(pathToFile, (err) => {
                if (err) {
                    reject(err.message);
                }
                resolve('File has been removed');
            });
        });
    }
}

export default new FileService();
