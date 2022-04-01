import Router from 'express';
import personalInfoController from '../controllers/personalInfo.controller';

const router = Router();

router.get('/', personalInfoController.getAll);
router.get('/:id', personalInfoController.getOne);
router.post('/', personalInfoController.create);
router.delete('/', personalInfoController.delete);

export default router;
