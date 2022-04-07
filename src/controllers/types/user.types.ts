import { AddressModel, PersonalInfoModel, ProdModel } from '../../models';

export interface IUser {
    name: string;
    age: number;
    salary: number;
    langs?: string[] | null;
    sizes: number[] | null;
    country: string;
    city: string;
}

export interface IGetAllQueryParams {
    name?: string;
    min?: string;
    max?: string;
    lang?: string;
}

export interface IFindParams {
    [key: string]: any;
}

type Models = typeof PersonalInfoModel | typeof AddressModel | typeof ProdModel;

export interface IUserIncludes {
    model: Models;
    as: string;
    where?: any;
}
