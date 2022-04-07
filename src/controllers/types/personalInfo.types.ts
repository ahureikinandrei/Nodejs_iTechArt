export interface IGetQuery {
    langs?: string | string[];
    first?: string;
    strict?: string;
    min?: string;
    max?: string;
}

export interface IPersonalInfo {
    name: string;
    langs?: string[] | null;
    sizes: number[] | null;
}

export interface IFindParams {
    where: any;
}
