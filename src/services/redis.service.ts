import { redisClient } from '../index';

export class RedisService {
    readonly listFIFO = 'listFIFO';

    readonly listLIFO = 'listLIFO';

    async addLockKey(key: string, value: string, ttl = 10) {
        await redisClient.set(key, value, {
            EX: ttl,
            NX: true,
        });
    }

    async addToFIFOList(value: string): Promise<string> {
        await redisClient.rPush(this.listFIFO, value);
        return value;
    }

    async addToLIFOList(value: string): Promise<string> {
        await redisClient.rPush(this.listLIFO, value);
        return value;
    }

    async getFromFIFOList(): Promise<string | null> {
        const value = await redisClient.lPop(this.listFIFO);
        return value;
    }

    async getFromLIFOList(): Promise<string | null> {
        const value = await redisClient.rPop(this.listLIFO);
        return value;
    }

    async clearAll() {
        const status = await redisClient.flushAll();
        return status;
    }

    // async subscribeChanel(chanel: string) {
    /*     async subscribeChanel() {
            const subscriber = redisClient.duplicate();
            await subscriber.connect();

            const unsubscribe = async () => {
                await subscriber.unsubscribe('channel');
            };

            await subscriber.subscribe('main', (msg) => {
                console.log(msg);
             unsubscribe();
            });
        }

       async publishMessage(req: any, res: any) {
            const publisher = redisClient.duplicate();
            await publisher.connect();
            await publisher.publish('main', 'message redis');
            await publisher.unsubscribe('main');
            res.json('m');
        } */
}

export default new RedisService();
