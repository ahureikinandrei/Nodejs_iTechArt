import Router from 'express';
import prodController from '../controllers/prods.controller';

const router = Router();

router.get('/', prodController.getAll);
router.get('/:id', prodController.getOne);
router.post('/', prodController.create);
router.delete('/:id', prodController.delete);

export default router;
