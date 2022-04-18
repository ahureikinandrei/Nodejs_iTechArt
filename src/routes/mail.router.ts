import Router from 'express';
import mailController from '../controllers/mail.controller';

const router = Router();

router.post('/', mailController.send);

export default router;
