import { ICreateOrder } from '../models/ICreateOrder';
import { IOrder } from '../models/IOrder';

export interface IOrdersRepository {
  findById(id: string): Promise<IOrder>;
  findAllPaginate(): Promise<IOrder | undefined>;
  create(data: ICreateOrder): Promise<IOrder>;
}
