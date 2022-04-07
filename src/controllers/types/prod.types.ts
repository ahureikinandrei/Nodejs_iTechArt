import Prod from '../../models/prods.models';

export interface IProd {
    name: string;
    cost: number;
    rest: number;
}

export interface IGetQuery {
    cost?: string;
    rest?: string;
    limit?: string;
    minCost?: string;
    maxCost?: string;
    oneOfCost?: string[];
}

export interface IUpdateQuery {
    updateAll: string;
}

export interface IUpdateProdsBody {
    cost: number;
    newCost: number;
}

export interface IUpdateProdsResponse {
    data: number;
    message: string;
}

export interface IFindParams {
    where: {
        cost?: string | string[] | any;
        rest?: string;
    };
    limit?: number;
    attributes?: {
        include: string[];
        exclude?: string[];
        group?: string;
    };
    order: any;
}

export interface IGetProdsRes {
    rows: Prod[];
    count: number;
}
