import Router from 'express';
import imageController from '../controllers/image.controller';

const router = Router();

router.get('/:imageName', imageController.get);
router.post('/', imageController.create);
router.delete('/:imageName', imageController.delete);

export default router;
