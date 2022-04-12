import { NextFunction, Request, Response } from 'express';
import { redisClient } from '../index';
import { IRedisBod, IRedisQuery } from './types/redis.types';
import ApiError from '../../error/ApiError';
import redisService from '../services/redis.service';

class RedisController {
    async get(
        req: Request<{}, IRedisBod, {}, IRedisQuery>,
        res: Response<IRedisBod>,
        next: NextFunction
    ) {
        try {
            const { key } = req.query;
            const value = await redisClient.get(key);

            res.json({ key, value });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async create(
        req: Request<{}, IRedisBod, IRedisBod>,
        res: Response<IRedisBod>,
        next: NextFunction
    ) {
        try {
            const { key, value, ttl = 60 } = req.body;
            if (!key || !value) {
                next(ApiError.badRequest('You need to specify key and value'));
                return;
            }

            await redisClient.set(key, value, {
                EX: ttl,
            });

            res.json({ key, value });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const { key } = req.params;
            await redisClient.del(key);

            res.json({ key });
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }

    async clearAll(req: Request, res: Response) {
        await redisService.clearAll();
        res.json('Redis has been cleared');
    }

    async addLockValue(
        req: Request<{}, IRedisBod, IRedisBod>,
        res: Response<IRedisBod>,
        next: NextFunction
    ) {
        const { key, value, ttl = 60 } = req.body;

        if (!key || !value) {
            next(ApiError.badRequest('You need to specify key and value'));
            return;
        }

        await redisService.addLockKey(key, value, ttl);

        res.json({ key, value });
    }
}

export default new RedisController();
