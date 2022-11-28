import Product from '@modules/products/infra/typeorm/entities/Product';
import { ICreateProduct } from '../models/ICreateProduct';
import { IFindProducts } from '../models/IFindProducts';
import { IProduct } from '../models/IProduct';
import { IUpdateStockProduct } from '../models/IUpdateStockProduct';

export type SearchParams = {
  page: number;
  skip: number;
  take: number;
};
export interface IProductsRepository {
  findAll(): Promise<IProduct[]>;
  findAllByIds(products: IFindProducts[]): Promise<Product[]>;
  findByName(name: string): Promise<IProduct | null>;
  findById(id: string): Promise<IProduct | null>;
  create(data: ICreateProduct): Promise<IProduct>;
  save(product: IProduct): Promise<IProduct>;
  updateStock(products: IUpdateStockProduct[]): Promise<void>;
  remove(product: IProduct): Promise<void>;
}
