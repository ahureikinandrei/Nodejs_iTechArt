import Router from 'express';
import userController from '../controllers/user.controller';

const router = Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', userController.create);
router.delete('/:id', userController.delete);
router.patch('/:id', userController.update);

export default router;
