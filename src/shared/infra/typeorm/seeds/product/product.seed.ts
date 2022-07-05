import { Factory, Seeder } from 'typeorm-seeding';
import Product from '@modules/products/infra/typeorm/entities/Product';

export default class ProductSeed implements Seeder {
  public async run(factory: Factory): Promise<any> {
    await factory(Product)().createMany(10);
  }
}
