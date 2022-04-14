import { Model, DataTypes } from 'sequelize';
import sequelize from '../db';

export interface ImageEncodeInstance extends Model {
    id: number;
    originName: string;
    encodeString: string;
    mimetype: string;
}

const ImageEncodeModel = sequelize.define<ImageEncodeInstance>('ImageEncode', {
    id: {
        primaryKey: true,
        type: DataTypes.INTEGER,
        autoIncrement: true,
    },
    originName: {
        type: DataTypes.STRING,
    },
    encodeString: {
        type: DataTypes.BLOB,
    },
    mimetype: {
        type: DataTypes.STRING,
    },
});

export default ImageEncodeModel;
