export interface IRedisBod {
    key: string;
    value: string | null;
    ttl?: number;
}

export interface IRedisQuery {
    key: string;
}
