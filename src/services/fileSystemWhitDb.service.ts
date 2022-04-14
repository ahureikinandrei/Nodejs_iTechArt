import fileUpload from 'express-fileupload';
import { FilesModel, ImageEncodeModel } from '../models';
import { FilesModelInstance } from '../models/files.model';

class FileSystemWhitDbService {
    async createFileInDb(
        originName: string,
        nameFileOnServer: string
    ): Promise<FilesModelInstance> {
        const file = await FilesModel.create({ originName, nameFileOnServer });
        return file;
    }

    async findFiles(originName: string): Promise<FilesModelInstance | null> {
        const file = await FilesModel.findOne({ where: { originName } });
        return file;
    }

    async saveFileInDb(file: fileUpload.UploadedFile) {
        const { mimetype, data, name } = file;
        const encodeString = data.toString('base64');

        const fileInstanceModel = await ImageEncodeModel.create({
            mimetype,
            encodeString,
            originName: name,
        });
        return fileInstanceModel;
    }

    async getFileFromDb(id: string) {
        const fileInstanceModel = await ImageEncodeModel.findOne({
            where: { id },
        });
        return fileInstanceModel;
    }
}

export default new FileSystemWhitDbService();
