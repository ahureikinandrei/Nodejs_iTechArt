import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

export interface FilesModelInstance extends Model {
    id: number;
    originName: string;
    nameFileOnServer: string;
}

const FilesModel = sequelize.define<FilesModelInstance>('Files', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    originName: {
        type: DataTypes.STRING,
    },
    nameFileOnServer: {
        type: DataTypes.STRING,
    },
});

export default FilesModel;
