import { Request, Response, NextFunction } from 'express';
import ApiError from '../../error/ApiError';
import { IGetAddressQuery, IFindParams } from './types/addresses.types';
import { AddressModel } from '../models';
import Address from '../models/address.model';

class AddressController {
    async getAll(
        req: Request<{}, Address[], {}, IGetAddressQuery>,
        res: Response<Address[]>,
        next: NextFunction
    ): Promise<Response | void> {
        try {
            const { name, country, city } = req.query;
            const findParams: IFindParams = {
                where: {},
            };

            if (name) {
                findParams.where.name = name;
            }

            if (country) {
                findParams.where.country = country;
            }

            if (city) {
                findParams.where.city = city;
            }
            const addresses = await AddressModel.findAll({
                where: {
                    name,
                    country,
                    city,
                },
            });

            res.json(addresses);
        } catch (e) {
            next(ApiError.internal(e.message));
        }
    }
}

export default new AddressController();
