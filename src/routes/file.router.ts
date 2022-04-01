import Router from 'express';
import fileController from '../controllers/file.controller';

const router = Router();

router.get('/:fileName', fileController.get);
router.post('/', fileController.create);
router.delete('/:fileName', fileController.delete);

export default router;
