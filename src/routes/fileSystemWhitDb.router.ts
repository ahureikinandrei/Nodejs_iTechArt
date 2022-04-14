import Router from 'express';
import fileSystemWhitDbController from '../controllers/fileSystemWhitDb.controller';

const router = Router();

router.get('/:fileName', fileSystemWhitDbController.get);
router.post('/', fileSystemWhitDbController.create);
router.post('/save', fileSystemWhitDbController.saveInDb);
router.get('/save/:id', fileSystemWhitDbController.getImageFromDb);
router.delete('/:fileName', fileSystemWhitDbController.delete);

export default router;
