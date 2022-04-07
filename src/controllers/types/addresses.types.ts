export interface IGetAddressQuery {
    name?: string;
    country?: string;
    city?: string;
}

export interface IFindParams {
    where: {
        name?: string;
        country?: string;
        city?: string;
    };
}
