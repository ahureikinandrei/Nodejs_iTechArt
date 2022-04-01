import Router from 'express';
import videoController from '../controllers/video.controller.stream';

const router = Router();

router.get('/:videoName', videoController.get);
router.post('/', videoController.create);
router.delete('/:videoName', videoController.delete);

export default router;
