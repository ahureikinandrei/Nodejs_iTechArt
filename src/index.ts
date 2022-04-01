/* eslint-disable import/first */
import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();
import cors from 'cors';
import path from 'path';
import fileUpload from 'express-fileupload';
import sequelize from './db';

import { PORT } from '../config/constants';
import router from './routes';

const port = PORT || 5000;
const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'static')));
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: '/tmp/',
    })
);

app.use('/api', router);

app.get('/', (req: Request, res: Response) => {
    res.send('Express + TypeScript Server');
});

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(port, () => {
            console.log(
                `[server]: Server is running at https://localhost:${port}`
            );
        });
    } catch (e) {
        console.log(e);
    }
};

start();
