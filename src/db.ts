import { Sequelize } from 'sequelize';
import {
    DB_HOST,
    DB_NAME,
    DB_PASSWORD,
    DB_PORT,
    DB_USER,
} from '../config/constants';

const dbName = DB_NAME || 'Postgres';
const userName = DB_USER || 'Ivan';
const userPassword = DB_PASSWORD || '';
const port = DB_PORT ? +DB_PORT : 5432;
const host = DB_HOST || '';

export default new Sequelize(dbName, userName, userPassword, {
    dialect: 'postgres',
    host,
    port,
    logging: false,
});
