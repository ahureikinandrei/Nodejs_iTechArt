import Router from 'express';
import redisController from '../controllers/redis.controller';

const router = Router();

router.get('/', redisController.get);
router.post('/', redisController.create);
router.delete('/:key', redisController.delete);
router.delete('/', redisController.clearAll);
router.post('/lock', redisController.addLockValue);
// router.post('/subscribe', redisService.publishMessage);

export default router;
