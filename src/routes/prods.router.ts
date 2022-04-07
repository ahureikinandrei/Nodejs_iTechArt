import Router from 'express';
import prodController from '../controllers/prods.controller';

const router = Router();

router.get('/cost/', prodController.getAllCosts);
router.get('/', prodController.getAll);
router.get('/:id', prodController.getOne);
router.post('/', prodController.create);
router.delete('/', prodController.deleteMany);
router.delete('/:id', prodController.delete);
router.patch('/', prodController.update);

export default router;
