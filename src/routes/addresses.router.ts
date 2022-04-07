import Router from 'express';
import addressController from '../controllers/addresses.controller';

const router = Router();

router.get('/', addressController.getAll);

export default router;
