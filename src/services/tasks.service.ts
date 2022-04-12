import redisService, { RedisService } from './redis.service';

class TasksService extends RedisService {
    readonly tasksMap = new Map<string, Function>();

    async addToLIFOQueue(taskName: string, task: Function) {
        await super.addToLIFOList(taskName);
        this.tasksMap.set(taskName, task);
    }

    async addToFIFOQueue(taskName: string, task: () => void) {
        await redisService.addToFIFOList(taskName);
        this.tasksMap.set(taskName, task);
    }

    async getFromFIFOQueue() {
        const { tasksMap } = this;
        const taskName = await redisService.getFromFIFOList();
        if (taskName === null) {
            return;
        }

        const task = tasksMap.get(taskName);
        if (task) {
            task();
        }
    }

    async getFromLIFOQueue() {
        const { tasksMap } = this;
        const taskName = await redisService.getFromLIFOList();
        if (taskName === null) {
            return;
        }

        const task = tasksMap.get(taskName);
        if (task) {
            task();
        }
    }
}

export default new TasksService();
