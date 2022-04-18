import Router from 'express';
import pdfController from '../controllers/pdf.controller';

const router = Router();

router.post('/', pdfController.create);

export default router;
