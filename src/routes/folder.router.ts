import Router from 'express';
import folderController from '../controllers/folders.controller';

const router = Router();

router.get('/', folderController.get);
router.post('/', folderController.create);
router.delete('/', folderController.delete);

export default router;
