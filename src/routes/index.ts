import { Router } from 'express';
import fileRouter from './file.router';
import imageRouter from './image.router';
import videoRouter from './video.router';
import folderRouter from './folder.router';
import userRouter from './user.router';
import personalInfoRouter from './personalInfo.router';
import prodRouter from './prods.router';
import addressRouter from './addresses.router';
import redisRouter from './redis.route';
import fileSystemWhitDbRouter from './fileSystemWhitDb.router';
import pdfRouter from './pdf.router';
import mailRouter from './mail.router';

const router = Router();

router.use('/file', fileRouter);
router.use('/image', imageRouter);
router.use('/video', videoRouter);
router.use('/folder', folderRouter);
router.use('/user', userRouter);
router.use('/personalInfo', personalInfoRouter);
router.use('/prod', prodRouter);
router.use('/address', addressRouter);
router.use('/redis', redisRouter);
router.use('/fsDb', fileSystemWhitDbRouter);
router.use('/pdf', pdfRouter);
router.use('/mail', mailRouter);

export default router;
